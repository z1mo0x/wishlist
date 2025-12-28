import { motion } from 'framer-motion'
import { memo } from 'react'
import Countdown from '../ux/countdown'

export default memo(function Hero({ children }: { children: React.ReactNode }) {



    return (
        <div className="pt-10 pb-25 bg-khaki-beige min-h-screen">
            <div className="container">
                <div className="xl:mx-0 mx-2.5 border-x-5 text-ebony text-center pt-10 border-ebony min-h-screen">
                    <motion.div
                        initial={{ opacity: 0, y: 100 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: .5 }}
                        className="title text-dark-walnut text-7xl">Wishlist</motion.div>
                    <motion.div className="text-ebony text-lg"
                        initial={{ opacity: 0, y: 100 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: .5, delay: .5 }}>
                        Список подарков, которые я бы хотела получить на
                        <span className="font-bold text-dark-walnut"> День рождения</span>
                    </motion.div>
                    <div className="relative mt-5 text-right pr-5 pl-5 xl:pr-15 xl:pl-15  font-bold text-dark-walnut text-4xl">
                        <motion.div className="text-lg text-center flex gap-1 justify-center flex-wrap xl:flex-nowrap"
                            initial={{ opacity: 0, x: -100 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: .5, delay: 1.5 }}
                        >
                            Осталось дней, чтобы купить подарок: <Countdown />
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, x: 100 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: .5, delay: 1 }}
                            className="title text-center mt-2.5 lg:mt-0 lg:absolute right-15 top-0">
                            29.03
                        </motion.div>
                    </div>
                    {children}
                </div>
            </div>
        </div>
    )
})