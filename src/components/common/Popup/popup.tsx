// OrderedPopup.tsx
import { memo, useCallback, useEffect, useState } from 'react';
import { Button } from '../../ui/button';
import { AnimatePresence, motion } from 'framer-motion';
import type { Tables } from '../../../database.types';
import { supabase } from '../../../lib/supabase';
import { toast } from 'sonner';
import { ShoppingCart, X } from 'lucide-react';
import { useStorage } from '../../../context/storageContext';

export default memo(function OrderedPopup({ reload }: { reload: () => Promise<void> }) {

    const { items, setItems } = useStorage();
    const [opened, setOpened] = useState(false);
    const [reservedItems, setReservedItems] = useState<Tables<'wishes'>[]>([]);

    // Переводим строку из localStorage в массив
    useEffect(() => {
        try {
            const parsed = items.reserved ? JSON.parse(items.reserved) : [];
            setReservedItems(Array.isArray(parsed) ? parsed : []);
        } catch (err) {
            console.error('Failed to parse reserved', err);
            setReservedItems([]);
        }
    }, [items.reserved]);

    const deleteOrder = useCallback(
        async (id: number, title: string) => {
            const { error } = await supabase
                .from('wishes')
                .update({ is_reserved: false })
                .eq('id', id)
                .select();

            if (!error) {
                toast.success(`Вы убрали бронь товара ${title}.`);

                // Удаляем из массива
                const filtered = reservedItems.filter((item) => item.id !== id);

                // Обновляем localStorage через контекст
                setItems({ reserved: JSON.stringify(filtered) });

                await reload()
            }
        },
        [reservedItems, setItems]
    );

    return (
        <>
            {reservedItems.length > 0 && (
                <div
                    onClick={() => setOpened((prev) => !prev)}
                    className="rounded fixed bottom-5 z-5 right-5 bg-white duration-500 p-5 cursor-pointer overflow-hidden"
                >
                    <div className="flex gap-5 justify-between">
                        Ваш выбор {opened ? <X /> : <ShoppingCart />}
                    </div>
                    <AnimatePresence>
                        {opened && (
                            <motion.div
                                initial={{ opacity: 0, x: '-100%' }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.25, ease: 'easeOut', opacity: { delay: 0.25 } }}
                                className="mt-3 origin-bottom-right cursor-default"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <div>Вы выбрали подарить:</div>
                                <div>
                                    {reservedItems.length > 0
                                        ? reservedItems.map((item) => (
                                            <div key={item.id} className="flex items-center gap-2.5 mt-2.5">
                                                <div className="font-bold">{item.title}</div>
                                                <div className="ml-auto">
                                                    Цена товара: <span className="font-bold text-lg">{item.price}</span> руб.
                                                </div>
                                                <Button
                                                    onClick={() => deleteOrder(item.id, item.title || '')}
                                                    className="cursor-pointer"
                                                >
                                                    Отменить
                                                </Button>
                                            </div>
                                        ))
                                        : ''}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            )}
        </>
    );
});
