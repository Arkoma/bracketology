const fs = require('fs');
const readline = require('readline');

const data = [];

async function processLineByLine(file) {
  const fileStream = fs.createReadStream(file);

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  for await (const line of rl) {
    let nextLine = line.split(',');
    if (Number.isFinite(+nextLine[0])) {
      if(nextLine[1]) {
        const teamData = { name: '', em: 0, o: 0, d: 0, t: 0, sos: 0, ncsos: 0, luck: 0 };
        teamData.name = nextLine[1];
        teamData.em = +nextLine[4];
        teamData.o = +nextLine[6];
        teamData.d = +nextLine[8];
        teamData.t = +nextLine[10];
        teamData.sos = +nextLine[14];
        teamData.ncsos = +nextLine[20];
        teamData.luck = +nextLine[12]; 
        data.push(teamData);
      }
    } 
  }
  return data;
}

const matchupWinnerIs = (team1, team2) => {
  let team1dataScore = 0;
  let team2dataScore = 0;
  processLineByLine('./kenpom.csv')
    .then(data => {
      let team1data = {};
      let team2data = {};
      data.forEach(team =>{
        if (team.name.toLowerCase() === team1.toLowerCase()) {
          team1data = team;
        }
        if (team.name.toLowerCase() === team2.toLowerCase()) {
          team2data = team;
        }
      });
      if (team1data.em > team2data.em) {
        team1dataScore +=1;
      } else { team2dataScore += 1}
      if (team1data.o < team2data.o) {
        team1dataScore +=1;
      } else { team2dataScore += 1}
      if (team1data.d < team2data.d) {
        team1dataScore +=1;
      } else { team2dataScore += 1}
      if (team1data.t < team2data.t) {
        team1dataScore +=1;
      } else { team2dataScore += 1}
      if (team1data.sos < team2data.sos) {
        team1dataScore += 1;
      } else { team2dataScore += 1; }
      if (team1data.ncsos < team2data.ncsos) {
        team1dataScore += 1;
      } else { team2dataScore +=1 }
      if (team1dataScore === team2dataScore) {
        if (team1data.luck < team2data.luck) {
          team1dataScore += 1;
        } else { team2dataScore +=1; }
      }
      if (Math.abs(team1dataScore - team2dataScore) < 2) {
        if (Math.floor(Math.random() * 2) === 0) {
          console.log(team1data.name, " will win");
        } else { console.log(team2data.name, " will win") }
      } else if (team1dataScore > team2dataScore) {
        console.log(team1data.name, " will win");
      } else { console.log(team2data.name, " will win") }
    })
    .catch(e => console.log(e)); 
}

matchupWinnerIs('virginia', 'Maryland Eastern Shore');