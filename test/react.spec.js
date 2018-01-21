// import React from 'react'
// import {shallow} from 'enzyme'
// import {spy} from 'sinon'
// import {expect} from 'chat'

// import Script from '~/client/components/Script'

import * as reduxs from '~/client/store/reducer';

/*
    SceneHeading,
    Action,
    Character,
    Parenthetical,
    Dialogue,
    Shot,
    Transition,
    Text


describe('Script React components', () => {
    let selectedScript, scriptComponent;
    let scripts = ['SceneHeading', 'Action', 'Dialogue', 'Transition', 'Shot', 'Transition']
    function getRandomScript () {
        return scripts[Math.floor() * 5]
    }
    beforeEach('Create component', () => {
        selectedScript = getRandomScript()
        scriptComponent = shallow(<Script />)
    })
    it('returns a script components', () => {
        //expect(scriptComponent.props.key.to.be.equal(selectedScript))
        //expect(scriptComponent.prototype.componenetDidMount.calledOnce).to.equal(true) 
    })
})
*/

describe('actions', () => {
    it('should create an action SET_VALUE to text content', () => {
        const value = 'screen play',
        componentKey = 'px123pxpx',
              name = 'nori dog'

        const expectedAction = {
            type: reduxs.SET_VALUE,
            value,
            componentKey,
            name 
        }

        expect(reduxs.setValue(value, componentKey, name).toEqual(expectedAction))
    })
}) 