// import { redirectIfLoggedInGuard } from './redirect-if-logged-in.guard';
// import { Router } from '@angular/router';

// describe('redirectIfLoggedInGuard', () => {
//   let routerSpy: jasmine.SpyObj<Router>;

//   beforeEach(() => {
//     routerSpy = jasmine.createSpyObj('Router', ['navigate']);
//     localStorage.clear();
//   });

//   it('should allow access when not logged in', () => {
//     localStorage.setItem('authState', JSON.stringify({ loggedIn: false }));

//     const result = redirectIfLoggedInGuard({} as any, {} as any, {
//       providers: [{ provide: Router, useValue: routerSpy }],
//     });

//     expect(result).toBeTrue();
//     expect(routerSpy.navigate).not.toHaveBeenCalled();
//   });

//   it('should redirect when logged in', () => {
//     localStorage.setItem('authState', JSON.stringify({ loggedIn: true }));

//     const result = redirectIfLoggedInGuard({} as any, {} as any, {
//       providers: [{ provide: Router, useValue: routerSpy }],
//     });

//     expect(result).toBeFalse();
//     expect(routerSpy.navigate).toHaveBeenCalledWith(['/']);
//   });
// });
