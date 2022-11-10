const ext_menu_running_options = {
    'time_interval_run': {
        'choices': ["Short Intervals", "Medium Intervals", "Long Intervals"],
        'title': 'Please Choose a Type of Interval'
    },
    'distance_interval_run': {
        'choices': ["Short Intervals", "Medium Intervals", "Long Intervals"],
        'title': 'Please Choose a Type of Interval'
    },
    'track_workout': {
        'choices': ["Sprint", "Mid-Distance", "Distance"],
        'title': 'Please Choose a Type of Track Workout'
    },
    'fartlek': {
        'choices': ["Short Intervals", "Medium Intervals", "Long Intervals"],
        'title': 'Please Choose a Type of Interval'
    },
    'long_run': {
        'choices': ["Time Intervals", "Distance Intervals", "Pace Intervals"],
        'title': 'Please Choose a Type of Long Run '
    }
}

const ext_menu_final_choice_to_units = 
{
    'Short Intervals': 'minutes',
    'Medium Intervals': 'minutes',
    'Long Intervals': 'minutes',
    'Sprint': 'miles',
    'Mid-Distance': 'miles',
    'Distance': 'miles',
    'Time Intervals': 'minutes',
    'Distance Intervals': 'miles',
    'Pace Intervals': 'minutes'
}


const type_to_workout_length_text = {
    'Short Intervals': 
    {
        'title': 'Enter a Workout Duration',
        'placeholder': 'Time ( in minutes )'
    },
    'Medium Intervals': 
    {
        'title': 'Enter a Workout Duration',
        'placeholder': 'Time ( in minutes )'
    },
    'Long Intervals': {
        'title': 'Enter a Workout Duration',
        'placeholder': 'Time ( in minutes )'
    },
    'Sprint': {
        'title': 'Enter a Workout Distance',
        'placeholder': 'Distance ( in miles )'
    },
    'Mid-Distance': {
        'title': 'Enter a Workout Distance',
        'placeholder': 'Distance ( in miles )'
    },
    'Distance': {
        'title': 'Enter a Workout Distance',
        'placeholder': 'Distance ( in miles )'
    },
    'Time Intervals': {
        'title': 'Enter a Workout Duration',
        'placeholder': 'Time ( in minutes )'
    },
    'Distance Intervals': {
        'title': 'Enter a Workout Distance',
        'placeholder': 'Distance ( in miles )'
    },
    'Pace Intervals': {
        'title': 'Enter a Workout Duration',
        'placeholder': 'Time ( in minutes )'
    }
} 

const all_run_types = ["time_interval_run", "distance_interval_run", 
"track_workout", "fartlek", "long_run"];

const type_to_ext_name = 
{
    'time_interval_run': 'Interval',
    'distance_interval_run': 'Interval',
    'track_workout': 'Track Workout',
    'fartlek': 'Fartlek',
    'long_run': 'Long Run'
}


export {ext_menu_running_options, type_to_workout_length_text, 
    all_run_types, type_to_ext_name, ext_menu_final_choice_to_units}