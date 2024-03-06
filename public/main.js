const canvas = document.querySelector("canvas");
const gl = canvas.getContext("webgl");

if (!gl) {
  throw new Error("Tidak Support WebGL");
}

alert("Silahkan Klik OK");

// atur ukuran canvas yang digunakan
// canvas.width = 800; // ini ukuran lebar dalam pixel
// canvas.height = 800; // ini ukuran tinggi dalam pixel

const canvasWidth = 600;
const canvasHeight = 600;

// Set ukuran canvas
canvas.width = canvasWidth;
canvas.height = canvasHeight;
gl.viewport(0, 0, canvas.width, canvas.height);

// bersihkan layer
gl.clearColor(255.255, 255.255, 255.255, 1);
gl.clear(gl.COLOR_BUFFER_BIT);

// membuat data koordinat titik
const segitiga = [
  0.25,
  0.5, // titik 1
  0.5,
  0.0, // titik 2
  0.0,
  0.0, // titik 3
];

const kotak = [
  -0.7,
  -0.2, // titik 1
  -0.1,
  -0.2, // titik 2
  -0.7,
  -0.6, // titik 3
  -0.1,
  -0.6, // titik 4
];

// Membuat vertex shader
const vertexShaderSource = `
  attribute vec2 a_position;
  void main() {
    gl_Position = vec4(a_position, 0.0, 1.0); // Posisi titik
  }
`;

// Membuat fragment shader
const fragmentShaderSource = `
  precision mediump float;  

  void main() {
      gl_FragColor = vec4(0, 0, 0, 1); // Warna titik
  }
`;

// membuat prog shader dan menghubungkan shader
const vertexShader = gl.createShader(gl.VERTEX_SHADER);
gl.shaderSource(vertexShader, vertexShaderSource);
gl.compileShader(vertexShader);

const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
gl.shaderSource(fragmentShader, fragmentShaderSource);
gl.compileShader(fragmentShader);

// Membuat program shader
const shaderProgram = gl.createProgram();
gl.attachShader(shaderProgram, vertexShader);
gl.attachShader(shaderProgram, fragmentShader);
gl.linkProgram(shaderProgram);
gl.useProgram(shaderProgram);

// Mendapatkan lokasi atribut posisi dari shader
const positionAttributeLocation = gl.getAttribLocation(
  shaderProgram,
  "a_position"
);
gl.enableVertexAttribArray(positionAttributeLocation);

//gambar segitiga
// Menggambar titik
function createAndBindBuffer(data) {
  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl.STATIC_DRAW);
  return buffer;
}

const positionBuffer1 = createAndBindBuffer(segitiga);
const positionBuffer2 = createAndBindBuffer(kotak);

// Menggambar objek pertama dengan gl.LINE_LOOP
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer1);
gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0);
gl.drawArrays(gl.TRIANGLES, 0, 3);

// Menggambar objek kedua dengan gl.LINES
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer2);
gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0);
gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);