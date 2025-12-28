import { Check } from "lucide-react"
import { ItemActions } from "../ui/item"
import { motion } from "framer-motion"
import { Button } from "../ui/button"
import { memo, useCallback, useEffect, useState } from "react"
import { supabase } from "../../lib/supabase"
import { toast } from "sonner"
import type { Tables } from "../../database.types"

type PropsActions = {
    reserve: boolean,
    link: string,
    id: number,
    onToggleReserve: () => Promise<void>;
}
type Wish = Tables<'wishes'>;

export default memo(function CardActions({ id, reserve, link, onToggleReserve }: PropsActions) {

    const [added, setAdded] = useState<Wish[]>([]);

    useEffect(() => {
        const raw = localStorage.getItem('reserved');
        if (!raw) return;

        try {
            const parsed: Wish[] = JSON.parse(raw);
            setAdded(parsed);
        } catch {
            setAdded([]);
        }
    }, []);

    const handleOrder = useCallback(async () => {
        const { data, error } = await supabase
            .from('wishes')
            .update({ is_reserved: !reserve })
            .eq('id', id)
            .select();

        if (error || !data || !data[0]) {
            toast.error('Произошла ошибка, попробуйте обновить страницу!');
            return;
        }

        const updated = data[0];

        toast.success(`Вы успешно забронировали подарок! ${updated.title}`);

        setAdded(() => {
            const raw = localStorage.getItem('reserved');
            const stored: Wish[] = raw ? JSON.parse(raw) : [];

            const exists = stored.some(item => item.id === updated.id);
            if (exists) return stored;

            const next = [...stored, updated];
            localStorage.setItem('reserved', JSON.stringify(next));
            return next;
        });

        await onToggleReserve();
    }, [id, reserve, onToggleReserve]);

    return (
        <>
            {reserve
                ?
                <div className="mt-2.5 bg-ebony px-4.5 py-2 rounded-lg text-white flex gap-2.5 items-center font-bold justify-center">
                    <Check />
                    Заказано
                </div>
                :
                <ItemActions className="mt-auto grid grid-cols-2">
                    <motion.div
                        className="w-full"
                        initial={{ scale: 1 }}
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: .3, type: 'spring', stiffness: 200 }}
                        whileTap={{ scale: .95 }}
                    >
                        <Button onClick={handleOrder} className="cursor-pointer w-full text-[16px] font-bold">Я подарю это</Button>
                    </motion.div>
                    <motion.div
                        className="w-full"
                        initial={{ scale: 1 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: .95 }}
                        transition={{ duration: .3, type: 'spring', stiffness: 200 }}
                    >
                        <Button className="cursor-pointer w-full font-bold text-[16px]" variant='outline' asChild>
                            <a href={link || '#'}>
                                Ссылка
                            </a>
                        </Button>
                    </motion.div>
                </ItemActions>
            }
        </>
    )
})