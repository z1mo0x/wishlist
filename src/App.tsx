import './App.css'
// import ColorPalette from './components/common/color-palette'
import Hero from './components/common/hero'
import BannerMoney from './components/ui/myself/banner'
import ItemsList from './components/ux/items'

function App() {

  return (
    <>
      {/* <ColorPalette /> */}
      <Hero>
        <BannerMoney />
        <ItemsList />
      </Hero>
    </>
  )
}

export default App
