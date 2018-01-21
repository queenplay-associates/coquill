
// function sum(a, b) {
//     return a + b;
//   }

// test('adds 1 + 2 to equal 3', () => {
//     expect(sum(1, 2)).toBe(3);
//   });


import React from 'react';
import renderer from 'react-test-renderer';
import Enzyme,{ shallow, mpunt } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';
import { Link } from 'react-router-dom';
import { MemoryRouter } from 'react-router'
import About from '../client/components/About'

Enzyme.configure({ adapter: new Adapter()});
//FIXME: takout __mock__ stuff. 🙄

describe('<About /> component', () => {
  
  const about = renderer.create(<MemoryRouter>
    <About />  
  </MemoryRouter>)

  test('snapshop of the DOM', () => { 
    let tree = about.toJSON()
    expect(tree).toMatchSnapshot()
  })

  test('links <Link to />', () => {
    let wrapper = shallow(<About />)
    //let linka = wrapper.find(Link) //.find({to: '/screenplays'})
    //console.log(linka)
    expect(wrapper.find(Link).length).toBe(1);
  })
})
