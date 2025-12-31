import { Item, ItemContent, ItemDescription, ItemHeader, ItemTitle } from "../ui/item";
import { delay, motion } from 'framer-motion'
import LikesBlock from "./likes";
import type { Tables } from "../../database.types";
import { memo } from "react";
import zaglyshka from '/no-photo.jpg'
import CardActions from "../common/card-actions";


export default memo(function ItemBlock({ id, likes, title, is_reserved, description, price, link_to_marketplace, image, reload }: Tables<'wishes'> & { reload: () => Promise<void> }) {



    return (
        <motion.div
            initial={{ opacity: 0, y: -200, zIndex: -1 }}
            whileInView={{ opacity: 1, y: 0, zIndex: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: .5, delay: Math.random() * .3, zIndex: { delay: .5 } }}>
            <Item variant='outline' className="
              relative content-start border-ebony justify-normal
              items-start px-0 w-full py-0 pb-5 overflow-hidden h-full">
                {is_reserved
                    ?
                    <div className="flex justify-center gap-1 absolute pl-5 top-12.5 bg-ebony w-75 z-2 h-7.5 -rotate-45 -left-25 font-bold text-xl text-white text-center">
                        Заказано
                    </div>
                    :
                    ''
                }
                <ItemHeader className="h-full max-h-75 overflow-hidden relative bg-white" >
                    <img className={`h-full w-full object-contain`}
                        src={image || zaglyshka} />
                    <div className="bg-ebony flex gap-2.5 flex-row-reverse rounded-tl-xl absolute -bottom-px -right-px">
                        <div className="ml-auto rounded px-2.5 text-white py-1 text-[18px]">
                            Цена: <span className="font-bold"> ~{price}</span> руб.
                        </div>
                        <LikesBlock likes={likes || 0} />
                    </div>
                </ItemHeader>
                <ItemContent className="px-5 pb-5" style={{ height: 'calc(100% - 300px)' }}>
                    <ItemTitle className="text-dark-walnut text-left text-2xl font-bold">
                        {title}
                    </ItemTitle>
                    <ItemDescription className="text-left mt-auto h-15 text-lg text-ebony">
                        {description}
                    </ItemDescription>
                    <CardActions onToggleReserve={reload} id={id} reserve={is_reserved || false} link={link_to_marketplace || '#'} />
                </ItemContent>
            </Item >
        </motion.div >
    )
})