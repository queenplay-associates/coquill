import React from 'react'

const anonAnimalsList = [
  'Alligator', 'Anteater', 'Armadillo', 'Auroch', 'Axolotl',
  'Badger', 'Bat', 'Beaver', 'Buffalo', 'Camel', 'Capybara',
  'Chameleon', 'Cheetah', 'Chinchilla', 'Chipmunk', 'Chupacabra',
  'Cormorant', 'Coyote', 'Crow', 'Dingo', 'Dinosaur', 'Dolphin',
  'Duck', 'Elephant', 'Ferret', 'Fox', 'Frog', 'Giraffe', 'Gopher',
  'Grizzly', 'Hedgehog', 'Hippo', 'Hyena', 'Ibex', 'Ifrit', 'Iguana',
  'Jackal', 'Kangaroo', 'Koala', 'Kraken', 'Lemur', 'Leopard',
  'Liger', 'Llama', 'Manatee', 'Mink', 'Monkey', 'Moose', 'Narwhal',
  'Nyan Cat', 'Orangutan', 'Otter', 'Panda', 'Penguin', 'Platypus',
  'Pumpkin', 'Python', 'Quagga', 'Rabbit', 'Raccoon', 'Rhino',
  'Sheep', 'Shrew', 'Skunk', 'Squirrel', 'Tiger', 'Turtle', 'Walrus',
  'Wolf', 'Wolverine', 'Wombat'
];

// store a list of users and access the length of that list
// if more users arrive, concat to list otherwise remove from list
// make the name of the user not show up in nav-bar if s/he is anon
  // no more 'stranger'

const randomAnonAnimal = currentCollaborators => {
  let len = currentCollaborators.length;

  while (len > 0) {

  }
};

export default () => {
  return <div className="active-collaborators">
    <ul className="animal-list">
      {
        anonAnimalsList.map(animal => {
          return <li className="animal-item">
            <img src={`/public/anonymous-icons/icons/${animal}.png`}
                 alt={`${animal}`}
                 title={`${animal}`}>
                {`Anonymous ${animal}`}
            </img>
          </li>
        })
      }
    </ul>
  </div>
}