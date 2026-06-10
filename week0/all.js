const students = [
    {name: "A", score: {mid: 100, final: 90}},
    {name: "B", score: {mid: 20, final: 75}},
    {name: "C", score: {mid: 80, final: 100}},
];

function findStudent(name) {

}

function findFirstPlace(scoreOf) {
    let x=0;
    
}

findFirstPlace(function(s) { return s.score.mid; });    // 중간고사 1등
findFirstPlace(function(s) { return s.score.final; });  // 기말고사 1등
findFirstPlace(function(s) { return s.score.mid + s.score.final; }); // 총점 1등

function addStudent(name, midScore, finalScore) {

}