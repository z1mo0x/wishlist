import { motion } from "framer-motion"
import image from '/money.png'
import imageArrow from '/arrow-1.svg'
import { memo } from "react"

export default memo(function BannerMoney() {
    return (
        <motion.div
            initial={{ scaleX: .5, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: .5, delay: 1 }}
            viewport={{ once: true }}
            className="md:h-50 h-full select-none flex justify-between border border-ebony m-5 rounded-2xl overflow-hidden origin-left relative">
            <motion.img
                initial={{ opacity: 0, scaleX: 0, x: '-100%' }}
                animate={{ opacity: 1, scaleX: 1, x: 0 }}
                transition={{ duration: .5, delay: 1 }}
                src={imageArrow} alt="фон деньга" className="absolute origin-left top-0 left-0 h-full object-cover" />
            <div className="h-full relative">
                <motion.img
                    initial={{ x: '-75%', opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: .5, delay: 1 }}
                    className="h-full hidden md:block translate-x-15 scale-150 object-contain" src={image} alt="деньга" />
            </div>
            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: .5, delay: 1.5 }}
                className="text-white border relative z-1 border-ebony m-2 mx-2px w-full md:m-5 md:w-max md:p-5 px-3 py-5 md:backdrop-blur-xs backdrop-blur-md  rounded-xl">
                <div className="text-2xl text-dark-walnut title">Если тут ничего не понравилось</div>
                <div className="mt-2.5 text-dark-walnut text-xl">Всегда есть денежный подарок!</div>
            </motion.div>
        </motion.div>
    )
})