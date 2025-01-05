import fs from 'fs';

export async function download(){
    const response = await fetch("https://tyradex.vercel.app/api/v1/pokemon");

    if (!response.ok) {
      throw new Error("Erreur réseau : " + response.statusText);
    }

    const jsonData = await response.json();
    fs.writeFileSync("./cache/downloadCache.json", JSON.stringify(jsonData));
}

export async function read(){
fs.readFile('./cache/downloadCache.json', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(data);
});
}


download();
read();