import { warmup_sets } from "./SwimmingWorkoutData";
import { ext_warm_up_sets } from "./SwimmingWorkoutData";

//again can create different databases of warm_up sets for beginners versus advanced swimmers


const HARD_INTESNITY_PACE_MULTIPLIER = .83;
const MED_INTENSITY_PACE_MULTIPLIER = .90;
const LIGHT_INTENSITY_PACE_MULITPLIER = .95;

const MAIN_SET_DURATION = .60;
const EXT_WARUP_DURATION = .10;
const WARM_UP_DURATION = .20;
const COOL_DOWN_DURATION = .10;

const intensity_to_multiplier = {
  'easy': LIGHT_INTENSITY_PACE_MULITPLIER,
  'medium': MED_INTENSITY_PACE_MULTIPLIER,
  'hard': HARD_INTESNITY_PACE_MULTIPLIER
};

function getRandomInt(max){
    return Math.floor(Math.random() * max);
  }


function convert_to_nearest_five_pace(list_of_paces){

  let new_paces = [];
  let curr_pace;
  let curr_sec;
  let curr_new_pace;
  let curr_min;


  for (let i = 0; i < list_of_paces.length; i++){
    
     curr_pace = list_of_paces[i];
     //now we want to round it to the nearest 05, or 00
     curr_min = Math.floor(curr_pace);
     curr_sec = (Math.ceil(curr_pace*60)) % 60;

     while (curr_sec % 5 != 0){
       curr_sec -= 1;
     }
     curr_new_pace = curr_min + (curr_sec/60);
     new_paces.push(curr_new_pace);

  }

  return new_paces;

}

function convert_to_time_string(time){

  let sec = "";
  if ((time * 60) % 60 == 0){
     sec = `00`;
  }else{
     sec = `${Math.floor((time * 60) % 60)}`;
     if (Math.floor((time * 60) % 60) < 10) {
      sec = `0${Math.floor((time * 60) % 60)}`;
     }
  }
  let time_in_min = `${Math.floor((time * 60) / 60)}:${sec}`;
  return time_in_min;

}


//could change this based on skill level
const skill_first_warm_up_distance = {
  'advanced': [1, 2, 2, 2, 2, 3, 4],
  'intermediate': [1, 2, 2, 2, 2],
  'beginner': [1]
}

const MAX_ITER = 10000;

function create_cool_down(steady_50_pace, steady_100_pace, workout_duration, skill_level) {

    steady_50_pace = parseFloat(steady_50_pace);
    steady_100_pace = parseFloat(steady_100_pace);

    let cool_down_duration = workout_duration*COOL_DOWN_DURATION;

    let cool_down = [];

    let num_repeats = 0;
    let actual_cool_down_duration = 0;
    let iterations = 0;

    //first we want to randomly choose between a repeat of 50's or a straight 100/200/300
    let type_of_cool_down = getRandomInt(2);
    if (type_of_cool_down == 0){

      //we want to assing this to be a long distance
      num_repeats = 0;
      const skill_level_distances = skill_first_warm_up_distance[skill_level];
      const skill_level_dist= skill_level_distances[getRandomInt(skill_level_distances.length)];

      while (cool_down_duration > 0 && ++iterations < MAX_ITER){

        num_repeats += 1;
        cool_down_duration -= (skill_level_dist*steady_100_pace);
        actual_cool_down_duration += (skill_level_dist*steady_100_pace)
      }

      let time_in_min = convert_to_time_string(skill_level_dist*steady_100_pace);
      cool_down.push(`${num_repeats} x ${skill_level_dist}00 : cool down pace on ${time_in_min}`);

    }else{

      num_repeats = 0;
      while (cool_down_duration > 0 && ++iterations < MAX_ITER){
          num_repeats += 1;
          cool_down_duration -= ((steady_50_pace) );
          actual_cool_down_duration += ((steady_50_pace));
      }

      let time_in_min = convert_to_time_string(steady_50_pace);
      cool_down.push(`${num_repeats} x 50 : cool down pace on ${time_in_min}`);

    }
    actual_cool_down_duration = Math.floor(actual_cool_down_duration);


    return {set: cool_down, total_time: actual_cool_down_duration, repeats: ''}

}


//skill will either be 

function create_warm_up(steady_25_pace, steady_50_pace, steady_100_pace, workout_duration, skill){
      var warm_up = [];
      var total_warm_up_time = Math.floor(workout_duration * WARM_UP_DURATION);

      const first_large_distances_to_choose_from = skill_first_warm_up_distance[skill];
      //should look something like [1,2,3,4]

      const first_large_distance = 
        first_large_distances_to_choose_from[getRandomInt(first_large_distances_to_choose_from.length)];
      //so we want to randomly choose either a 100, 200, 300, or 400 to warm up with
    
      const first_dist_time = Math.ceil(first_large_distance*steady_100_pace)
      warm_up.push(`${first_large_distance}00 @ warm-up pace on ${first_dist_time}:00`);


      var dist_to_pace = {0: steady_25_pace, 1: steady_50_pace, 2: steady_100_pace};
      var actual_warmup_time = 0;
      //estimate is that warmup should take around 20% of total workout time
  
      const num_repeat_sets_to_choose_from = [1, 2, 2, 3, 3, 3, 4];

      let num_repeated_sets = num_repeat_sets_to_choose_from[getRandomInt(num_repeat_sets_to_choose_from.length)];
      
      total_warm_up_time -= first_dist_time; 
      
      //so with the left over time, we can create the rest of the warm up
      var total_round_time = total_warm_up_time/num_repeated_sets; //amount of minutes per repeat set of the warm up
      while (total_round_time < steady_25_pace && num_repeated_sets > 1){
        num_repeated_sets -=1;
        total_round_time = total_warm_up_time/num_repeated_sets;
      }
  
      //so we have a list of possible distances we can complete in a total round
  
      var exercises_so_far = []; //want to create this to ensure we don't have too many repeats
      
      while (total_round_time >= steady_25_pace){
        
  
        //creating a list of possible distances we can swim in the amount of time we have left in the round
        var possible_distances = ['sets_for_25'];
        if (total_round_time >= steady_50_pace){
          possible_distances.push('sets_for_50');
        }
        if (total_round_time >= steady_100_pace){
          possible_distances.push('sets_for_100');
        }
  
  
        var next_distance_idx = getRandomInt(possible_distances.length);
  
        var next_distance = possible_distances[next_distance_idx]; //randomly get the first warm up distance
  
        var num_dist_repeats = getRandomInt(warmup_sets[next_distance].length);
  
        var list_dist_exercises = (warmup_sets[next_distance])[num_dist_repeats]; //list of exercise for the amount of repeats of this dist
  
        var spec_ex_idx = (getRandomInt(list_dist_exercises.length));
        var specific_exercise = list_dist_exercises[spec_ex_idx]; 
  
        
        var exercises_so_far = [...exercises_so_far];
        //don't want repeats
        if (exercises_so_far.includes(specific_exercise)){
          var idx_count = 0;
  
    
          while (exercises_so_far.includes(specific_exercise) && idx_count <= list_dist_exercises.length -  1){
            var spec_ex_idx = (spec_ex_idx + 1) % list_dist_exercises.length;
            specific_exercise = list_dist_exercises[spec_ex_idx];
            idx_count += 1;
            //if we've reached a max idx count, means we've tried all possible exercises
          }
          //so now we tried our best to get a specific exercise
        }
  
        exercises_so_far.push(specific_exercise)
  
  
  
        var first_dist_name = next_distance.slice(9, next_distance.length);
  
        //just figuring out how to display time here
        var time = dist_to_pace[next_distance_idx];

        const time_in_min = convert_to_time_string(time);
        
        var next_exercise = `${num_dist_repeats + 1} x ${first_dist_name}: ${specific_exercise} on ${time_in_min}`;
  
        //safety check so we don't get two repeats
        if (!warm_up.includes(next_exercise)){
  
          warm_up.push(`${num_dist_repeats + 1} x ${first_dist_name}: ${specific_exercise} on ${time_in_min}`);
    
          actual_warmup_time += ((num_dist_repeats + 1)*dist_to_pace[next_distance_idx]);
          total_round_time -= ((num_dist_repeats + 1)*dist_to_pace[next_distance_idx]);
        }
  
      }
      

      actual_warmup_time = (actual_warmup_time * num_repeated_sets) + first_dist_time;

      exercises_so_far = [];

      return {set: warm_up, total_time: actual_warmup_time, repeats: num_repeated_sets}
  
  }





  function create_hrt_180_ext_warmup(steady_25_pace, steady_50_pace, steady_100_pace, workout_duration){

      let ext_warm_up_time = Math.floor(workout_duration*EXT_WARUP_DURATION);

      let ext_warmup_75_pace = (.90 * steady_25_pace)*3;
      let ext_warmup_50_pace = (.90 * steady_50_pace);

      //want to round these paces to the nearest 5, for now we should round down
      let new_paces = convert_to_nearest_five_pace([ext_warmup_50_pace, ext_warmup_75_pace]);

      ext_warmup_75_pace = new_paces[1];
      ext_warmup_50_pace = new_paces[0];

      let actual_warmup_time = 0;

      let ext_warm_up = [];

      let num_repeats_to_choose_from = [1,2,2,2,2,2,2,2,2,2,2,2,2,2,3,3,3];

      let dist_to_pace = {0: ext_warmup_50_pace, 1: ext_warmup_75_pace};

      let num_repeated_sets = num_repeats_to_choose_from[getRandomInt(num_repeats_to_choose_from.length)];
     //want it more likely that the number of repeats is 2 and least likely that it's 1
        
     let total_round_time = Math.floor(ext_warm_up_time/num_repeated_sets); //amount of minutes per repeat set of the warm up
        
     while (total_round_time < ext_warmup_50_pace && num_repeated_sets > 1){
            num_repeated_sets -=1;
            total_round_time = ext_warm_up_time/num_repeated_sets;
     }

     var exercises_so_far = []; //want to create this to ensure we don't have too many repeats
     
     while (total_round_time >= ext_warmup_50_pace){

          var possible_distances = ['sets_for_50'];
         
          if (total_round_time >= ext_warmup_75_pace){
            possible_distances.push('sets_for_75');
          }
          
          var next_distance_idx = getRandomInt(possible_distances.length);

          var next_distance = possible_distances[next_distance_idx]; //randomly get the first warm up distance
  
          var num_dist_repeats = getRandomInt(6);

    
          var list_dist_exercises = (ext_warm_up_sets[next_distance]);
    
          var spec_ex_idx = getRandomInt(list_dist_exercises.length);
          var specific_exercise = list_dist_exercises[spec_ex_idx]; 
          
              
          var exercises_so_far = [...exercises_so_far];
          //don't want repeats
          if (exercises_so_far.includes(specific_exercise)){
            var idx_count = 0;
        
            while (exercises_so_far.includes(specific_exercise) && idx_count <= list_dist_exercises.length -  1){

              var spec_ex_idx = (spec_ex_idx + 1) % list_dist_exercises.length;
              specific_exercise = list_dist_exercises[spec_ex_idx];
              idx_count += 1;
              //if we've reached a max idx count, means we've tried all possible exercises
            }
            //so now we tried our best to get a specific exercise
          }
    
          exercises_so_far.push(specific_exercise)
    
    
          var first_dist_name = next_distance.slice(9, next_distance.length); //gets rid of the sets_for part 
    
          //just figuring out how to display time here
          var time = dist_to_pace[next_distance_idx];

          while (num_dist_repeats * time > total_round_time){
              num_dist_repeats -= 1;
          }
          
          let time_in_min = convert_to_time_string(time);

          var next_exercise = `${num_dist_repeats + 1} x ${first_dist_name}: ${specific_exercise} on ${time_in_min}`;
    
          //safety check so we don't get two repeats
          if (!ext_warm_up.includes(next_exercise)){
    
            ext_warm_up.push(next_exercise);
      
            actual_warmup_time += ((num_dist_repeats + 1)*dist_to_pace[next_distance_idx]);
            total_round_time -= ((num_dist_repeats + 1)*dist_to_pace[next_distance_idx]);
          }
    
        }
    

        actual_warmup_time = Math.floor(actual_warmup_time * num_repeated_sets);

        exercises_so_far = [];
        return {set: ext_warm_up, total_time: actual_warmup_time, repeats: num_repeated_sets}


     }

  



  function create_hrt_180_set(steady_25_pace, steady_50_pace, steady_100_pace, workout_duration, workout_intensity){
      
    let hrt_180_workout_time = Math.floor(workout_duration * MAIN_SET_DURATION);

    //figuring out the paces for an individual based on what intensity they choose and their steady paces
    let intensity_multiplier = intensity_to_multiplier[workout_intensity];
 
    let hrt_180_50_pace = steady_50_pace*intensity_multiplier;
    let hrt_180_75_pace = (steady_50_pace* 1.5)*intensity_multiplier;
    let hrt_180_100_pace = (steady_100_pace)*intensity_multiplier;
    let hrt_180_125_pace = (steady_100_pace*1.25)*intensity_multiplier;
    let hrt_180_150_pace = (steady_100_pace*1.5)*intensity_multiplier;
    let hrt_180_200_pace = (steady_100_pace * 2)*intensity_multiplier;


    let new_paces = convert_to_nearest_five_pace([hrt_180_50_pace, hrt_180_75_pace, hrt_180_100_pace,
        hrt_180_125_pace, hrt_180_150_pace, hrt_180_200_pace]);

    hrt_180_50_pace = new_paces[0]
    hrt_180_75_pace = new_paces[1];
    hrt_180_100_pace = new_paces[2];
    hrt_180_125_pace = new_paces[3];
    hrt_180_150_pace = new_paces[4];
    hrt_180_200_pace = new_paces[5];


    //forcing the randomness to make it more likely to choose a certain number of repeats for a distances
    const dist_repeats = {
      '50': [1, 2, 2, 3, 3, 3, 4, 4, 4, 4, 4, 5, 6],
      '75': [1, 2, 2, 2, 3,3,3, 4, 4, 5],
      '100': [1, 2, 2, 3, 3, 3, 3, 4, 4, 5],
      '125': [1, 2, 3, 4],
      '150': [1, 2, 3, 4],
      '200': [1, 2, 3]
    }

    const dist_to_pace = {
      0: hrt_180_50_pace,
      1: hrt_180_75_pace,
      2: hrt_180_100_pace,
      3: hrt_180_125_pace,
      4: hrt_180_150_pace,
      5: hrt_180_200_pace
    }


    let hrt_180_set = [];

    let actual_set_time = 0;

    let num_repeats_to_choose_from = [1, 2, 2, 2, 3, 3, 3, 3, 3, 4, 4, 4, 4];

    let num_repeated_sets = num_repeats_to_choose_from[getRandomInt(num_repeats_to_choose_from.length)];
   //want it more likely that the number of repeats is 2 and least likely that it's 1
      
   let total_round_time = Math.floor(hrt_180_workout_time/num_repeated_sets); //amount of minutes per repeat set of the warm up
      
   const MAX_ITER = 1000;
   let iterations = 0;
   while (total_round_time < hrt_180_50_pace && num_repeated_sets > 1 && ++iterations < MAX_ITER){
          num_repeated_sets -=1;
          total_round_time = hrt_180_workout_time/num_repeated_sets;
   }

   iterations = 0;
   let distances_so_far = [];
   let prev_distance = '';

   while (total_round_time >= hrt_180_50_pace && ++iterations < MAX_ITER){


        var possible_distances = ['50'];
       
        if (total_round_time >= hrt_180_75_pace){
          possible_distances.push('75');
        }
        if (total_round_time >= hrt_180_100_pace){
          possible_distances.push('100');
        }
        if (total_round_time >= hrt_180_125_pace){
          possible_distances.push('125');
        }
        if (total_round_time >= hrt_180_150_pace){
          possible_distances.push('150');
        }
        if (total_round_time >= hrt_180_200_pace){
          possible_distances.push('200');
        }


        let next_distance_idx = getRandomInt(possible_distances.length);

        let next_distance = possible_distances[next_distance_idx]; //randomly get the first warm up distance

        if (next_distance == prev_distance){

          next_distance_idx = (next_distance_idx + 1) % (possible_distances.length);
          next_distance = possible_distances[next_distance_idx]
        }

        prev_distance = next_distance;

        let num_dist_repeats_to_choose_from = dist_repeats[next_distance];
        let num_dist_repeats = num_dist_repeats_to_choose_from[getRandomInt(num_dist_repeats_to_choose_from.length)];

  
        let time = dist_to_pace[next_distance_idx];

        iterations = 0;
        while (num_dist_repeats * time > total_round_time && ++iterations < MAX_ITER){
            num_dist_repeats -= 1;
        }

        if (distances_so_far.includes(next_distance)){

           time -= .08

        }
        distances_so_far.push(next_distance)

        
        let time_in_min = convert_to_time_string(time);

        let next_exercise = `${num_dist_repeats + 1} x ${next_distance}: HRT 180 on ${time_in_min}`;
        //safety check so we don't get two repeats
        if (!hrt_180_set.includes(next_exercise)){
  
          hrt_180_set.push(next_exercise);
    
          actual_set_time += ((num_dist_repeats + 1)*dist_to_pace[next_distance_idx]);
          total_round_time -= ((num_dist_repeats + 1)*dist_to_pace[next_distance_idx]);
        }
  
      }
  

      actual_set_time = Math.floor(actual_set_time * num_repeated_sets);

      return {set: hrt_180_set, total_time: actual_set_time, repeats: num_repeated_sets}

  }

  export { create_warm_up, create_hrt_180_ext_warmup, create_hrt_180_set, create_cool_down }