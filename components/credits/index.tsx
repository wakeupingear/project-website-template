import { useConfig } from '@/pages/_app';
import React from 'react';
import Contributor from './Contributor';

export default function Credits() {
    const { groupedContributors } = useConfig();
    return (
        <div className="flex flex-col gap-4">
            {Object.values(groupedContributors).map((contributors, i) => (
                <div key={i} className="flex flex-col gap-2">
                    {Object.keys(groupedContributors).length > 1 && (
                        <h2 className="text-xl">
                            {Object.keys(groupedContributors)[i]}
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
