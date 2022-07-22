import React, {useEffect, useState} from 'react';

import { useSearchParams } from 'react-router-dom'

function Authorized() {
    const [groups, setGroups] = useState<any[]>([]);
    const [searchParams,] = useSearchParams();
    useEffect(() => {
        const url = 'https://api.groupme.com/v3/groups?omit=memberships&per_page=20&token='+searchParams.get('access_token');
        fetch(url).then(
            (res) => res.json()).then(
                (res) => setGroups(res.response)
            )
    }, [searchParams]);
    const GM_LOGO = 'https://d3sq5bmi4w5uj1.cloudfront.net/images/brochure/og_image_poundie.png?1588160432';

    return (
        <div className='card m-2'>
            <h3 className='card-title p-3'>Select a Group</h3>
            <div className="list-group list-group-flush">
                {groups.length === 0 && 'Loading groups...'}
                {groups.map((grp) => (
                <a href={`/messages?access_token=${searchParams.get('access_token')}&group_id=${grp.id}`} className="list-group-item list-group-item-action" key={grp.id}>
                    <img src={grp.image_url || GM_LOGO} style={{height: 24, width: 24}} className="image-thumbnail me-2" alt="avatar" />
                    {grp.name}
                </a>))}
            </div>
        </div>
        
    )
}

export default Authorized;