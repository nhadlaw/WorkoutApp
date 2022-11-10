import {type_to_list_times, rest_times, run_dynamic_stretches, 
    warm_up_time_percent, dist_to_warm_up_dist}from './RunningWorkoutData'


function getRandomInt(max){
    return Math.floor(Math.random() * max);
  }


const WARM_UP_DURATION = .20;
const MAIN_SET_DURATION = .65;
const COOL_DOWN_DURATION = .15;

const NUM_MAIN_SET_REPEATS = [1,1,2,2,2,3,3,3,3,4,4,4];

const NUM_DYNAMIC_WARM_UP_EXERCISES = [6, 6, 8, 8, 8, 10, 10, 10];
const NUM_DYMANIC_WARM_UP_EXERCISE_REPEATS = [10, 12, 15, 16, 20];
const ONE_DYNAMIC_WARM_UP_EXERCISE_TIME = .5 //as in 30 seconds


function round_to_nearest_tenth(num) {

    //3.55
    let whole_num = Math.floor(num); //3
    let curr_decimal = num - whole_num; //.55
    let curr_tenth = curr_decimal * 10 //5.5
    let curr_tenth_in_decimal = (Math.floor(curr_tenth))/10 //5 then .5
    let new_nearest_tenth_num = whole_num + curr_tenth_in_decimal;
    return new_nearest_tenth_num;

}


//creating a run warm up for someone who chooses a certain run duration

function create_run_warm_up_for_time(workout_duration, steady_mile_pace ) {

    let warm_up = [];
    let exercises_so_far = [];
    //workout duration will go down by however much the warm_up time will take
    let warm_up_time = workout_duration*WARM_UP_DURATION;

    let num_dynamic_warm_up_exercises = NUM_DYNAMIC_WARM_UP_EXERCISES[getRandomInt(NUM_DYNAMIC_WARM_UP_EXERCISES.length)];
   
    console.log('num_dynamic warm up ex', num_dynamic_warm_up_exercises)
   
    let remainding_warm_up_time = warm_up_time 
    //- (num_dynamic_warm_up_exercises)*ONE_DYNAMIC_WARM_UP_EXERCISE_TIME; //because we are assuming that each dynamic warm up takes around a minute
    let continuous_warm_up_run_min = Math.floor(remainding_warm_up_time)

    warm_up.push(`${continuous_warm_up_run_min}:00  @ warm-up pace`);

    for (let i = 0; i < num_dynamic_warm_up_exercises; i ++) {

        let curr_idx = getRandomInt(run_dynamic_stretches.length)
        let curr_dynamic_exercise = run_dynamic_stretches[curr_idx];
        let curr_dynamic_exercise_repeats;
        
            if (exercises_so_far.includes(curr_dynamic_exercise)) {
                while (curr_idx < (run_dynamic_stretches.length - 1) && exercises_so_far.includes(curr_dynamic_exercise)) {
        
                    curr_idx += 1;
                    curr_dynamic_exercise = run_dynamic_stretches[curr_idx];
                }

                if (curr_idx < run_dynamic_stretches.length && (exercises_so_far.includes(curr_dynamic_exercise))) {
                    
                    curr_dynamic_exercise_repeats = NUM_DYMANIC_WARM_UP_EXERCISE_REPEATS[getRandomInt(NUM_DYMANIC_WARM_UP_EXERCISE_REPEATS.length)];
                    warm_up.push(`${curr_dynamic_exercise_repeats} ${curr_dynamic_exercise}`);
                    exercises_so_far.push(curr_dynamic_exercise)
                }

            } else {
                curr_dynamic_exercise_repeats = NUM_DYMANIC_WARM_UP_EXERCISE_REPEATS[getRandomInt(NUM_DYMANIC_WARM_UP_EXERCISE_REPEATS.length)];
                warm_up.push(`${curr_dynamic_exercise_repeats} ${curr_dynamic_exercise}`);
                exercises_so_far.push(curr_dynamic_exercise);
            }
        }
      
    return {set: warm_up, total_length: warm_up_time, repeats: 0}

}



function create_run_warm_up_for_distance(workout_distance, steady_mile_pace) {

        let warm_up = [];
        //workout duration will go down by however much the warm_up time will take
        let warm_up_distance = round_to_nearest_tenth( workout_distance*WARM_UP_DURATION );
        
        let num_dynamic_warm_up_exercises = NUM_DYNAMIC_WARM_UP_EXERCISES[getRandomInt(NUM_DYNAMIC_WARM_UP_EXERCISES.length)];

        //might want to change (warm-up pace) this to steady_mile_pace
        warm_up.push(`${warm_up_distance} miles  @ warm-up pace`);

        for (let i = 0; i < num_dynamic_warm_up_exercises.length; i ++) {

            let curr_dynamic_exercise = run_dynamic_stretches[getRandomInt(run_dynamic_stretches.length)];
            let curr_dynamic_exercise_repeats = NUM_DYMANIC_WARM_UP_EXERCISE_REPEATS[getRandomInt(NUM_DYMANIC_WARM_UP_EXERCISE_REPEATS.length)];
            warm_up.push(`${curr_dynamic_exercise_repeats} x ${curr_dynamic_exercise}`);
        }

        return {set: warm_up, total_length: warm_up_distance, repeats: 0}
}



function create_ladder_interval_run_for_time(duration, type_of_interval) {

    

}

function create_random_interval_run_for_time(duration, type_of_interval) {

}

function create_increasing_interval_run_for_time(duration, type_of_interval) {

}

function create_decreasing_interval_run_for_time(duration, type_of_interval) {

}

const interval_stuctures = [
    'ladder',
    'random',
    'decreasing',
    'increasing'
]

const interval_stuctures_to_set_fn = {
    'ladder': 'create_ladder_interval_run',
    'random': 'create_random_interval_run',
    'decreasing': 'create_decreasing_interval_run',
    'increasing': 'create_increasing_interval_run'
}

//Type of interval will be one of: short, medium, long, mix
//Different interval workouts will be one of: LADDER, INCREASING, DECREASING, RANDOM
function create_interval_workout_for_time(workout_duration, workout_intensity, type_of_interval) {

    let interval_workout_time = workout_duration * MAIN_SET_DURATION;
    
    let num_sets = NUM_MAIN_SET_REPEATS[getRandomInt(NUM_MAIN_SET_REPEATS.length)];

    let interval_structure = interval_stuctures[getRandomInt(interval_stuctures.length)];

    let structure_fn = interval_stuctures_to_set_fn[interval_structure];

}

export {create_run_warm_up_for_distance, 
    create_run_warm_up_for_time, create_interval_workout_for_time}