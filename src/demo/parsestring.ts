const data =
  "4d 48 67 32 4f 47 4a 6b 4d 44 49 77 59 57 51 78 4f 44 5a 69 4e 6a 51 33 59 54 59 35 4d 57 4d 32 59 54 56 6a 4d 47 4d 78 4e 54 49 35 5a 6a 49 78 5a 57 4e 6b 4d 44 6c 6b 59 32 4d 30 4e 54 49 30 4d 54 51 77 4d 6d 46 6a 4e 6a 42 69 59 54 4d 33 4e 32 4d 30 4d 54 55 35";
const data2 = data.split(" ");
function hexToString(hexArray: string[]): string {
  return hexArray.map((hex) => String.fromCharCode(parseInt(hex, 16))).join("");
}

const decodedString = hexToString(data2);
console.log(decodedString);
// decode base64
const base64 = Buffer.from(decodedString, "base64").toString("utf-8");
console.log(base64);
// hex to number
const uuu = BigInt(base64);

console.log(uuu.toString());
