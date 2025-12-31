// ItemsList.tsx
import { memo, useCallback, useEffect, useState } from 'react';
import { ItemGroup } from '../ui/item';
import ItemBlock from './item';
import { motion } from 'framer-motion';
import { supabase } from '../../lib/supabase';
import type { Tables } from '../../database.types';
import OrderedPopup from '../common/Popup/popup';
import LoadingCard from '../ui/myself/loading-card';

export default memo(function ItemsList() {
    const [wishes, setWishes] = useState<Tables<'wishes'>[]>();

    const loadWishes = useCallback(async () => {
        const { data, error } = await supabase
            .from('wishes')
            .select('*')
            .order('is_reserved', { ascending: true })
            .order('likes', { ascending: false });

        if (!error) setWishes(data || []);
    }, []);

    useEffect(() => {
        loadWishes();
    }, [loadWishes]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1 }}
            className=""
        >
            <ItemGroup className="mt-10 px-5 grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-4">
                {wishes
                    ? wishes.map((item) => (
                        <ItemBlock key={item.id} reload={loadWishes} {...item} />
                    ))
                    : (
                        <>
                            <LoadingCard />
                            <LoadingCard />
                            <LoadingCard />
                        </>
                    )}
            </ItemGroup>
            <OrderedPopup reload={loadWishes} />
        </motion.div>
    );
});
