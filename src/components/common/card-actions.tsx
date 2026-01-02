// CardActions.tsx
import { Check } from 'lucide-react';
import { ItemActions } from '../ui/item';
import { motion } from 'framer-motion';
import { Button } from '../ui/button';
import { memo, useCallback, useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { toast } from 'sonner';
import type { Tables } from '../../database.types';
import { useStorage } from '../../context/storageContext';

type PropsActions = {
    reserve: boolean;
    link: string;
    id: number;
    onToggleReserve: () => Promise<void>;
};

type Wish = Tables<'wishes'>;

export default memo(function CardActions({ id, reserve, link, onToggleReserve }: PropsActions) {
    const { items, setItems } = useStorage();
    const [loading, setLoading] = useState<boolean>(false);
    const [_, setAdded] = useState<Wish[]>([]);

    // Синхронизируем added с items.reserved
    useEffect(() => {
        try {
            const parsed: Wish[] = items.reserved ? JSON.parse(items.reserved) : [];
            setAdded(Array.isArray(parsed) ? parsed : []);
        } catch (err) {
            console.error('Failed to parse reserved in CardActions', err);
            setAdded([]);
        }
    }, [items.reserved]);

    const handleOrder = useCallback(async () => {
        setLoading(true);

        const { data, error } = await supabase
            .from('wishes')
            .update({ is_reserved: !reserve })
            .eq('id', id)
            .select();

        if (error || !data || !data[0]) {
            toast.error('Произошла ошибка, попробуйте обновить страницу!');
            setLoading(false);
            return;
        }

        const updated = data[0];

        toast.success(`Вы успешно забронировали подарок! ${updated.title}`);

        // Обновляем reserved через контекст
        setItems((prev) => {
            const stored: Wish[] = prev.reserved ? JSON.parse(prev.reserved) : [];
            const exists = stored.some((item) => item.id === updated.id);

            if (exists) {
                // Если уже есть — возвращаем старый массив (на самом деле, reserve уже true, но на всякий)
                return prev;
            }

            const next = [...stored, updated];
            return { reserved: JSON.stringify(next) };
        });

        setLoading(false);
        await onToggleReserve();
    }, [id, reserve, onToggleReserve, setItems]);

    return (
        <>
            {reserve ? (
                <div className="mt-2.5 grid grid-cols-2 gap-2 items-center">
                    <div className="text-[16px] font-bold bg-ebony px-4 py-1.5 rounded-lg text-white flex gap-2.5 items-center justify-center">
                        <Check />
                        Заказано
                    </div>
                    <motion.div
                        className="w-full"
                        initial={{ scale: 1 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ duration: 0.3, type: 'spring', stiffness: 200 }}
                    >
                        <Button className="cursor-pointer w-full font-bold text-[16px]" variant="outline" asChild>
                            <a target='_blank' href={link || '#'}>
                                Ссылка
                            </a>
                        </Button>
                    </motion.div>
                </div>
            ) : (
                <ItemActions className="mt-2.5 grid grid-cols-2">
                    <motion.div
                        className="w-full"
                        initial={{ scale: 1 }}
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3, type: 'spring', stiffness: 200 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Button disabled={loading} onClick={handleOrder} className="cursor-pointer w-full text-[16px] font-bold">
                            Я подарю это
                        </Button>
                    </motion.div>
                    <motion.div
                        className="w-full"
                        initial={{ scale: 1 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ duration: 0.3, type: 'spring', stiffness: 200 }}
                    >
                        <Button className="cursor-pointer w-full font-bold text-[16px]" variant="outline" asChild>
                            <a target='_blank' href={link || '#'}>
                                Ссылка
                            </a>
                        </Button>
                    </motion.div>
                </ItemActions>
            )}
        </>
    );
});
