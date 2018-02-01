import { animate, state, style, transition, trigger, keyframes } from '@angular/animations';

/* class name will get assigned to anmation section of using component */
export const AngularANIMATION =
     /*trigger name we have to using in HTML as propertybinding with @ */
     /*Sate foractive*/
     trigger('AnimationTrigger', [
       state('active', style({
          backgroundColor: '#cfd8dc', transform: 'scale(1.1)',
       })),
       /* second state for Inactive*/
       state('inactive', style({
        backgroundColor: '#fff', transform: 'scale(1)',
     })),
     transition('active <=> inactive', animate(500)),  /*Transition active to Inactive and vise versa*/
    ]);

export const AngularANIMATIONI =
    /*trigger name we have to using in HTML as propertybinding with @ */
    /*Sate foractive*/
    trigger('AnimationInOut', [
        state('in', style({ transform: 'translateX(0)' })),
        transition(':enter', [
        style({ transform: 'translateX(-500%)' }),
        /*Keyframes */
        animate(5000, keyframes([
            style({ transform: 'scale(0)' }),
            style({ transform: 'scale(.25)' }),
            style({ transform: 'scale(.5)' }),
            style({ transform: 'scale(1)' })
            ]))
        ]),
        transition(':leave', [
        animate(200, style({ transform: 'translateX(500%)' }))
        ]),
    ]);
