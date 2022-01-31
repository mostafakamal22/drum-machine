import { Button, Col, Container, Row } from "react-bootstrap"
import { useEffect, useState } from "react"

// importing audio files and storing its sources
import Qpad  from './assets/Q.mp3'
import Wpad  from './assets/W.mp3'
import Epad  from './assets/E.mp3'
import Apad  from './assets/A.mp3'
import Spad  from './assets/S.mp3'
import Dpad  from './assets/D.mp3'
import Zpad  from './assets/Z.mp3'
import Xpad  from './assets/X.mp3'
import Cpad  from './assets/C.mp3'

let drumPads = {
  Q: [Qpad, "Rock on!"], 
  W: [Wpad, "Drum Roll!"],  
  E: [Epad, "Music Time!"],   
  A: [Apad, "Big Hit!"],   
  S: [Spad, "Party On!"],   
  D: [Dpad, "Jamming on!"],  
  Z: [Zpad, "Popstarts!"],   
  X: [Xpad, "On the mood!"],  
  C: [Cpad, "On the rythm!"] 
}

const App = ()=> {
  
  // state for turning on/off the drum machine
  const [isOn , setIsOn ] = useState(true)

  //state for displaying a phrase for each audio when it is playing  
  const [playingNow , setPlayingNow ] = useState("")

   

  useEffect(() => {
    // play audio by clicking each button 
    const play = (padName)=> {
      if (isOn===true){
      // display a phrase   
      setPlayingNow(drumPads[padName][1])
      // grab audio 
      const audio = document.getElementById(padName)
      // resitting audio to start (in case something was playing)
      audio.currentTime = 0
      // then play
      audio.play() 
      }
      else{
        return
      }
    }
    //play audio by (keypress/click btn) function
    const keyPressPlay = (event)=>{
      if(event.key!== undefined){
        let key = event.key.toUpperCase()
        drumPads[key] &&   play(key)
      }else{
        // for clicking btn event
        let key = event.target.innerText.toUpperCase()
        play(key)
      }
    }

    // add event listener to key press
    window.addEventListener("keypress", keyPressPlay)

    // add event listener for clicking btn
    const btn = document.getElementsByClassName("drum-pad")
    for (let i = 0; i < btn.length; i++) {
      btn[i].addEventListener("click",keyPressPlay)
    }
    // re-setting phrase on update 
    isOn===false&& setPlayingNow("")

    return () => {
      // clean up the press/click effect on every state's update
      window.removeEventListener("keypress", keyPressPlay)
      for (let i = 0; i < btn.length; i++) {
        btn[i].removeEventListener("click",keyPressPlay)
      }
    }

  },[isOn])

  return (
    <Container 
    style={{height:"100vh"}}
    className="d-flex justify-content-center align-items-center bg-info bg-gradient" fluid>
      <Container
      className="rounded shadow  bg-light bg-gradient p-4"
      style={{maxWidth:550}}
      id="drum-machine">
        <Row>
          <Col
          style={{maxWidth:310}} 
          className="d-grid mx-auto"
          sm={7}>
            {Object.keys(drumPads).map(pad=>(
              <Button
                style={{fontWeight:"bold"}}
                variant="info"
                className="drum-pad shadow rounded text-dark"
                padkey={pad} 
                key={pad}>
                  {pad}
                  <audio 
                    className="clip"
                    src={drumPads[pad][0]}  
                    id={pad}/>
              </Button>
            ))}
          </Col>

          <Col className="d-flex justify-content-center align-items-center py-2" sm={5}>
           <div className="w-100 text-center">
            <p 
            style={{fontWeight:"bold"}}
            className="mb-0">Power</p>
            <Button 
            style={{height:30, width:60,borderRadius:25}}
            className="mb-3 bg-dark p-1 mx-auto border-0" 
            onClick={()=>{
              setIsOn(isOn?false:true)
              isOn?
              document.getElementById('toggle').style.transform="translate(100%)":
              document.getElementById('toggle').style.transform="translate(0)"
              }}>
                <span 
                  className="d-block bg-primary w-50 h-100"
                  id="toggle">
                </span>
            </Button>
            <div 
            style={{maxWidth:310,fontWeight:"bold", height:50}}
            className="d-flex mx-auto justify-content-center align-items-center rounded bg-warning bg-gradient p-2 mb-2" 
            id="display">
                {playingNow}
            </div>
            <label style={{fontWeight:"bold"}} htmlFor="volume">Control Volume:</label>
            <input 
              className="d-block mx-auto"
              type="range" 
              id="volume" 
              name="volume" 
              defaultValue="100" 
              min="0" 
              max="100"
              onChange={(event)=> {
                setPlayingNow(`Volume: ${event.target.value}`)
                const audio = document.getElementsByClassName("clip")
                for(let i =0 ; i< audio.length; i++){
                  audio[i].volume= (event.target.value)/100
                }
              }}/> 
           </div>
          </Col>
        </Row>
      </Container> 
    </Container>
  )
}

export default App;
