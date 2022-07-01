// dummy data for the database models
import bcrypt from 'bcryptjs';
const data = {
  stores: [
    {
      name: 'Bike N Go Tower Bridge',
      slug: 'BNG-TB',
      address: '98 Tower Bridge, EC1K 8UB',
      city: 'London',
    },
    {
      name: "Bike N Go King's Cross",
      slug: 'BNG-KC',
      address: "12 King's Cross, WC1H 10DT",
      city: 'London',
    },
  ],
  users: [
    {
      name: 'Eddie',
      email: 'admin@example.com',
      password: bcrypt.hashSync('123456'),
      isAdmin: true,
    },
    {
      name: 'John',
      email: 'user@example.com',
      password: bcrypt.hashSync('123456'),
      isAdmin: false,
    },
  ],
  products: [
    {
      // _id: '1',
      name: 'Jam Mountain Bike',
      slug: 'jam-mountain-bike',
      category: 'Mountain Bike',
      image: '/images/p1.png',
      price: 1,
      countInStock: 5,
      brand: 'Jam',
      rating: 3.5,
      numReviews: 15,
      description:
        'High quality mountain bike. Essential for a weekend off in the forest with the family or friends',
    },
    {
      // _id: '2',
      name: 'Test Road Bike',
      slug: 'test-road-bike',
      category: 'Road Bike',
      image: '/images/p2.png',
      price: 1,
      countInStock: 0,
      brand: 'Test',
      rating: 1,
      numReviews: 1,
      description: 'High quality road bike',
    },
    {
      // _id: '3',
      name: 'Carrera Folding Bike',
      slug: 'carrera-folding-bike',
      category: 'Folding Bike',
      image: '/images/p3.png',
      price: 1,
      countInStock: 5,
      brand: 'Carrera',
      rating: 4.5,
      numReviews: 5,
      description: 'High quality folding bike',
    },
    {
      // _id: '4',
      name: 'Xiaomi Folding Bike',
      slug: 'xiaomi-folding-bike',
      category: 'Folding Bike',
      image: '/images/p4.png',
      price: 1,
      countInStock: 5,
      brand: 'Xiaomi',
      rating: 2.5,
      numReviews: 300,
      description: 'High quality folding bike',
    },
  ],
};

export default data;
