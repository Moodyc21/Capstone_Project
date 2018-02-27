# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
ActiveRecord::Base.connection.tables.each do |t|
    ActiveRecord::Base.connection.reset_pk_sequence!(t)
  end


User.destroy_all

moody = User.create!(
    email: 'moodyc21@gmail.com',
    password: 'cm017914',
    password_confirmation: 'cm017914',
    image: 'https://i.imgur.com/XT6bwJI.jpg?1'
)

sarah = User.create!(
    email: 'sarahhampton@gmail.com',
    password: 'blahblah',
    password_confirmation: 'blahblah',
    image: 'https://i.imgur.com/70Rc93W.jpg'
)

Board.create!(name: "moody's", year: "2012", completed: false, user: moody)
Board.create!(name: "moody's other", year: "2014", completed: false, user: moody)

Board.create!(name: "sarah's", year: "2016", completed: false, user: sarah)
