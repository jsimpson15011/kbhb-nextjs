window.addEventListener('load', function () {
  const jQuery = null
  window.tgmplibs = "media2bar"
  window.tgmp = new TuneGenieMediaPlayer("playerbar", {
    brand: "kout",
    theme: ["#000000"],
    position: "bottom",
    autostart: false,
    infoTrayOnLoad: false,
    frame: false
  })
})