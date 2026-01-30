import React from "react"
import { Button } from "./_components/ui/button"

const name = "test"
console.log(name)

const Home = () => {
  return (
    <div>
      <Button>Test</Button>
      <h1>{name}</h1>
    </div>
  )
}

export default Home
