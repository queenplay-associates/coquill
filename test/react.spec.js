
// function sum(a, b) {
//     return a + b;
//   }

// test('adds 1 + 2 to equal 3', () => {
//     expect(sum(1, 2)).toBe(3);
//   });


import React from 'react';
import renderer from 'react-test-renderer';
import { Link } from 'react-router-dom';
import { MemoryRouter } from 'react-router'
import About from '../client/components/About'

test('<About /> component', () => { 
  const about = renderer.create(<MemoryRouter>
    <About />  
  </MemoryRouter>)
  let tree = about.toJSON()
  expect(tree).toMatchSnapshot()
})
