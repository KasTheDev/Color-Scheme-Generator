const colorInput = document.getElementById('color-input')
const colorSchemeBtn = document.getElementById('color-scheme-btn')
const colorMode = document.getElementById('color-mode-select')
const colorContainer = document.getElementById('color-container')
const hexContainer = document.getElementById('hex-container')
const hexArray = []

colorSchemeBtn.addEventListener('click', fetchColorScheme)

function fetchColorScheme() {
  const hexValue = getColorScheme()
  const modeSelected = colorMode.value

  fetch(`https://www.thecolorapi.com/scheme?hex=${hexValue}&mode=${modeSelected}&count=4`)
    .then(res => res.json())
    .then(data => {
      hexArray.length = 0; // Clear the hexArray
      hexArray.push(hexValue.toUpperCase())
      for (let color of data.colors) {
        hexArray.push(color.hex.clean)
      }
      colorContainer.innerHTML = ``
      hexContainer.innerHTML = ``
      render()
    })
}

function getColorScheme() {
  const selectedColor = colorInput.value //returns Hex value chose (ex. #fa2ffa)
  return selectedColor.substring(1) //removes # from Hex
}

function render(){
    const colors = hexArray.map(function(hex){
        colorContainer.innerHTML += `
        <div style="background-color:#${hex};" class = "color"></div>`
        hexContainer.innerHTML += `<p>#${hex}</p>`
    })
    
}
