import React from 'react'


import '~/public/assets/Guides.css'

export default () =>
  <div>
    <div className='guides-container'>
        <h3>Components of a Screenplay</h3>
        <ul>
            <li><b>Scene Heading:</b> appears at the beginning of every scene and tell us the location and time of the scene</li>
            <li><b>Action:</b> describes what is happening and is always written in the present tense</li>
            <li><b>Character:</b> the character name appears above every line of dialogue</li>
            <li><b>Parenthetical:</b> used within dialogue lines or below character names to describe the way that a line of dialogue is to be delivered</li>
            <li><b>Dialogue:</b> what the character is saying</li>
            <li><b>Shot:</b> describes what the camera sees (ex: wide shot)</li>
            <li><b>Transition:</b> used to indicate a scene change (ex: fade in, fade out)</li>
            <li><b>Text:</b> anything else that doesn't fit the above</li>
        </ul>
    </div>
  </div>