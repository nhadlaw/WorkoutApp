



//WARM UP DATABASE

//have it choose between 25, 50, and 100 for now
const warmup_sets = {
    sets_for_25: 
    [
        ["Underwater", "Minimum Breath", "Drill"],
        ["Underwater", "Minimum Breath", "Choice kick", "Choice Pull", "Choice Drill"],
        ["Underwater", "Minimum Breath", "Choice kick", "Choice Pull", "Choice Drill"],
        ["Underwater", "Minimum Breath", "Choice kick", "IM swim", "IM kick", "IM drill", "Choice Pull", "Choice Drill" ]
    ],
    sets_for_50:
    [
        ["Minumum Breath", "Choice kick", "Choice Pull", "Choice Drill", "15m Underwater"],
        ["Minumum Breath", "Choice kick", "Choice Pull", "Choice Drill", "15m Underwater"],
        ["Minumum Breath", "Choice kick", "Choice Pull", "Choice Drill", "15m Underwater", "IM swim", "IM kick", "IM drill"],
        ["Minumum Breath", "Choice kick", "Choice Pull", "Choice Drill", "15m Underwater", "IM swim", "IM kick", "IM drill"],

    ],
    sets_for_100:
    [
        ["Choice kick", "Freestyle Swim", "IM swim", "IM kick"],
        ["Choice kick", "Freestyle Swim", "IM swim", "IM kick"],
    ]
}





//HRT 180 DATA FOR WORKOUTS
const ext_warm_up_sets = 
{
    sets_for_50: ['Choice Descend to HRT 180', '6/15m Underwater', 'Stroke Descend'],
    sets_for_75: ['Choice Descend to HRT 180', '5/6/15m Underwater','Stroke Descend'],
}




export {warmup_sets, ext_warm_up_sets};

    