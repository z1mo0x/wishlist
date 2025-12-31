import './App.css'
// import ColorPalette from './components/common/color-palette'
import Hero from './components/common/hero'
import BannerMoney from './components/ui/myself/banner'
import ItemsList from './components/ux/items'
import StorageContextProvider from './context/storageContext'

function App() {

  return (
    <StorageContextProvider>
      {/* <ColorPalette /> */}
      <Hero>
        <BannerMoney />
        <ItemsList />
      </Hero>
    </StorageContextProvider>
  )
}

export default App
