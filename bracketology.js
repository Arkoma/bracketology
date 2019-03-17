let lineReader = require('line-reader')

const data = []

const csvParser = (file) => {
  let nextLine;
  lineReader.eachLine(file, (line, done) => {
    nextLine = line.split(',');
    if (Number.isFinite(+nextLine[0])) {
      if(nextLine[1]) {
        const teamData = {
          name: '',
          em: 0,
          sos: 0,
          ncsos: 0,
          luck: 0
        };
        teamData.name = nextLine[1];
        data.push(teamData);
      }
    }
    if (done) {
      console.log(data);
      return data;
    }
  });

}

console.log(csvParser('./kenpom.csv'));

//   if (err) {
//     return console.log(err);
//   }

//   //Convert and store csv information into a buffer. 
//   bufferString = data.toString(); 

//   //Store information for each individual person in an array index. Split it by every newline in the csv file. 
//   arr = bufferString.split('\n'); 
//   console.log(arr); 

//   for (i = 0; i < arr.length; i++) { 
//     JSON.stringify(arr[i]); 
//   }

//   JSON.parse(arr); 
//   res.send(arr);  
//  });
// }

// const matchupWinnerIs = (team1data, team2data) => {
//   let team1dataScore = 0;
//   let team2dataScore = 0;
//   if (team1data.em > team2data.em) {
//     team1dataScore +=1;
//   }
//   if (team1data.sos < team2data.sos) {
//     team1dataScore += 1;
//   } else { team2dataScore += 1; }
//   if (team1data.ncsos < team2data.ncsos) {
//     team1dataScore += 1;
//   } else { team2dataScore +=1 }
//   if (Math.floor(Math.random() * 2) > 0) {
//     if (team1data.luck < team2data.luck) {
//       team1dataScore += 2;
//     } else { team2dataScore +=2; }
//   }
//   if (team1dataScore > team2dataScore) {
//     return team1data.name
//   } else if (team2dataScore > team1dataScore ) { return team2data.name;}
//   matchupWinnerIs(team1data, team2data);
// }