import { useConfig } from '@/pages/_app';
import React from 'react';
import Contributor from './Contributor';

export default function Credits() {
    const {
        team: { contributors },
    } = useConfig();

    return (
        <div className="flex flex-col gap-4">
            {Object.values(contributors).map((contributors, i) => (
                <div key={i} className="flex flex-col gap-2">
                    {Object.keys(contributors).length > 1 && (
                        <h2 className="text-xl">
                            {Object.keys(contributors)[i]}
                        </h2>
                    )}
                    <div className="flex gap-2">
                        {contributors.map((contributor, j) => (
                            <Contributor key={j} contributor={contributor} />
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}
