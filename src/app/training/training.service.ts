import { Subject } from 'rxjs/Subject';
import { Exercise } from './exercise.model';

export class TrainingService {
  // the availableExercises method is private so it cannot be modified externally
  private availableExercises: Exercise[] = [
    { id: 'crunches', name: 'Crunches', duration: 30, calories: 8 },
    { id: 'push-ups', name: 'Push Ups', duration: 20, calories: 8 },
    { id: 'bicep-curls', name: 'Bicep Curls', duration: 120, calories: 1 },
    { id: 'burpees', name: 'Burpees', duration: 30, calories: 8 }
  ];

  exerciseChanged = new Subject<Exercise>();
  private runningExercise: Exercise;
  private exercises: Exercise[] = [];

  // this getter method will provide the service clients with
  // a copy of the availableExercises with the slice() method
  getAvailableExercises() {
    return this.availableExercises.slice();
  }

  startExercise(SelectedId: string) {
    this.runningExercise = this.availableExercises.find(
      ex => ex.id === SelectedId);
    // the ... spread operator returns a copy of the runningExercise object
    // instead of returning a reference to the same object being stored in the service
    this.exerciseChanged.next({ ...this.runningExercise });
  }

  completeExercise() {
    // this line would add a new exercise into the runningExercise array object
    // this.exercises.push(this.runningExercise);

    // using the spread operator, we create a new object and can push new values (date and state) into it
    this.exercises.push({
      ...this.runningExercise,
      date: new Date(),
      state: 'completed'
    });
    this.runningExercise = null;
    this.exerciseChanged.next(null);
  }

  cancelExercise(progress: number) {
    // this line would add a new exercise into the runningExercise array object
    // this.exercises.push(this.runningExercise);

    // using the spread operator, we create a new object
    // and can push new values (date and state) into it
    this.exercises.push({
      ...this.runningExercise,
      duration: this.runningExercise.duration * (progress / 100),
      calories: this.runningExercise.calories * (progress / 100),
      date: new Date(),
      state: 'cancelled'
    });
    this.runningExercise = null;
    this.exerciseChanged.next(null);
  }

  getRunningExercise() {
    return { ...this.runningExercise };
  }

  getCompletedOrCancelledExercises() {
  return this.exercises.slice();
}

}
