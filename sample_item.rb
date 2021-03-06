{
  verb: 'get',
  url: '/api/v1/items',
  relative_path: '/items',
  type: 'collection-ro',
  secured_by: ['staff'],
  name: 'items',
  response_code: 200,
  body:  {
    data:  [
      {
        id: '1',
        type: 'item',
        created_at: '1430407103',
        updated_at: '1430407180',
        name: 'Hamburger',
        links: {
          self: 'https://app.my-awesome-restaurant.com/api/v1/items/1'
        }
      },
      {
        id: '2',
        type: 'item',
        created_at: '1430407103',
        updated_at: '1430407180',
        name: 'Cheese burger',
        links: {
          self: 'https://app.my-awesome-restaurant.com/api/v1/items/2'
        }
      },
      {
        id: '3',
        type: 'item',
        created_at: '1430407103',
        updated_at: '1430407180',
        name: 'French Fries',
        links: {
          self: 'https://app.my-awesome-restaurant.com/api/v1/items/3'
        }
      }
    ]
  }
}
