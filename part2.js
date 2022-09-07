var rightAnswer;
var userInput;
var grade = 0;


window.onload = getXMLFile;

function getXMLFile() {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      processXML(xhr);
    }
  };
  xhr.open("GET", "FinalQuiz.xml", true);
  xhr.send();
}

function processXML(xhr) {
  var i;
  //get data as xml file
  var xmldoc = xhr.responseXML;
  //start table
  var table = "";
  //process data by record
  var x = xmldoc.getElementsByTagName("question");
  //Question 1
  for (var i = 0; i < x.length; i++) {
    table += x[i].getElementsByTagName("qtitle")[0].childNodes[0].nodeValue;
    table += "<br>" + "<br>" + "<input type='radio' value='a' name='question" + i + "'>";
    table += x[i].getElementsByTagName("a")[0].childNodes[0].nodeValue;
    table += "<br>" + "<input type='radio' value='b' name='question" + i + "'>";
    table += x[i].getElementsByTagName("b")[0].childNodes[0].nodeValue;
    table += "<br>" + "<input type='radio' value='c' name='question" + i + "'>";
    table += x[i].getElementsByTagName("c")[0].childNodes[0].nodeValue;
    table += "<br>" + "<input type='radio' value='d' name='question" + i + "'>";
    table += x[i].getElementsByTagName("d")[0].childNodes[0].nodeValue + "<br>"+ "<br>" ;

    document.getElementById("display").innerHTML = table;
  }
  rightAnswer =
    xmldoc.getElementsByTagName("rightanswers")[0].childNodes[0].nodeValue;
  
}

function getGrade() {
  userInput = "";

  userInput += document.querySelector("input[name=question0]:checked").value;
  userInput += ",";

  userInput += document.querySelector("input[name=question1]:checked").value;
  userInput += ",";

  userInput += document.querySelector("input[name=question2]:checked").value;
  userInput += ",";

  userInput += document.querySelector("input[name=question3]:checked").value;
  userInput += ",";

  userInput += document.querySelector("input[name=question4]:checked").value;

  calcMarks();
}

function calcMarks() {
  for (var i = 0; i < 5; i++) {
    if (
      rightAnswer.substring(2 * i, 2 * i + 1) ==
      userInput.substring(2 * i, 2 * i + 1)
    ) {
      grade++;
    }
  }
  document.getElementById("grade").innerHTML = "Total Grade: "+grade+"/5 (" + grade/5 *100 + "%)";
  grade = 0
}
