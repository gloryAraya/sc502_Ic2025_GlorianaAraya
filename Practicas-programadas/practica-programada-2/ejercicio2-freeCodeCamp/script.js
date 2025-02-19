/*Primer paso*/
function getAverage(scores) {
    let totalScore=0;
    for(let i=0;i<scores.length; i++){
      totalScore= totalScore +scores[i]
    }
    const average=totalScore/scores.length;
    return average;
  }
  
  console.log(getAverage([92, 88, 12, 77, 57, 100, 67, 38, 97, 89]));
  console.log(getAverage([45, 87, 98, 100, 86, 94, 67, 88, 94, 95]));

  /*Segundo paso*/
  function getGrade(score) {
    if(score===100){
      return "A++";
    } else if (score<=59) {
      return "F";
    } else if(score<=69){
      return "D";
  
    } else if(score<=79){
      return "C";
  
    } else if(score<=89){
      return "B";
  
    } else if(score<=99){
      return "A";
  }
  return score;
  }
  
  console.log(getGrade(96));
  console.log(getGrade(82));
  console.log(getGrade(56));

/*Tercer paso*/
  function hasPassingGrade(score) {
    return getGrade(score) !=="F";
  }

  /*Cuarto paso*/
  function studentMsg(totalScores, studentScore) {
    if(getGrade(studentScore) !=="F"){
      return "Class average: "+getAverage(totalScores)+". Your grade: "+ getGrade(studentScore)+". You passed the course."
  
    }else{
      return "Class average: "+getAverage(totalScores)+". Your grade: "+getGrade(studentScore)+". You failed the course."
    }
  }
    
  console.log(studentMsg([92, 88, 12, 77, 57, 100, 67, 38, 97, 89], 37));
