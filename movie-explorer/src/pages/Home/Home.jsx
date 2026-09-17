import Hero from './Hero'
import Features from './Features'

function Home() {
  return (
    <div className="flex flex-col items-center">
      <Hero />
      <Features />
    </div>
  )
}

export default Home