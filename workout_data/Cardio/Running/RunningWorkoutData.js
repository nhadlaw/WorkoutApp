

//INTERVAL RUN SECTION 

//in seconds because it's shorter times
const short_interval_times = [ 15, 20, 25, 30, 40, 45, 50, 60, 75, 90]; 

//in seconds
const med_interval_times = [ 60, 75, 90, 100, 105, 115, 120];

const long_interval_times = [120, 150, 180, 210, 240, 270, 300];

const type_to_list_times = 
{
    'short': short_interval_times,
    'medium': med_interval_times,
    'long': long_interval_times,
    'mix': short_interval_times.concat(med_interval_times, long_interval_times)
}

//REST TIMES

//look at intensity and then skill level to determine the rest
//times that an individual will get for their interval runs
const rest_times = 
{      
            'easy': 
            {   
                'beginner': 4,
                'intermediate': 3,
                'advanced': 2,
            },
            'medium': 
            {   
                'beginner': 3,
                'intermediate': 2,
                'advanced': 1,
            },
            'hard': 
            {   
                'beginner': 1.5,
                'intermediate': 1,
                'advanced': .5,
            },
        
}


//WARM UP SECTION 

const run_dynamic_stretches = [
        'Fire Hydrants Per Leg', 'Zombie Leg Kick Ups Per Leg', 'High Knees Per Leg', 'Lunges Per Leg', 'Squat With Hip Rotation Per Leg', 'Glute Bridges Per Leg', 
        'Knee Circles Counter-clockwise and Clockwise', 'Knee to Chest Per Leg', 'Leg Swings Per Leg', 'Mountain Climbers Total', 'Forward Skip Total', 
        'Side Lunges Per Leg'
]


const warm_up_time_percent = .2


const dist_to_warm_up_dist = 
{
    .5: .1,
    1: .2,
    1.5: .3,
    2: .5,
    2.5: .6,
    3: .75,
    3.5: .8,
    4: 1,
    4.5: 1.1,
    5: 1.25
}
//otherwise just make it .25 of the distance and round down to the nearest tenth
export {type_to_list_times, rest_times, run_dynamic_stretches, warm_up_time_percent, dist_to_warm_up_dist}