import AuthenticatedResource from "./wrappers/AuthenticatedResource";
import { AbstractInstanceType } from "rest-hooks";
import Organization from "./Organization";

// export default class Boilerplate extends AuthenticatedResource {
//   static urlRoot = "/api/organizations/30/boilerplates";
// }

export default class Boilerplate extends AuthenticatedResource {
  id = "";

  pk() {
    return this.id;
  }
  static urlRoot = "/api/organizations/`{organizationId}`/boilerplates";
  static getKey() {
    return "Boilerplate";
  }
}

// export default class Boilerplate extends AuthenticatedResource {
//     readonly id: string = '';
// // }

//     pk() { return this.id; }
//     // static urlRoot = "/api/organizations/`{organizationId}`/boilerplates";
//     // since we won't be using urlRoot to build our urls we
//     // still need to tell rest hooks how to uniquely identify this Resource
//     static getKey() {
//       return 'Boilerplate';
//     }

//     /**
//      * Get the url for a Resource
//      */
//     static url<T extends typeof AuthenticatedResource>(
//       this: T,
//       urlParams?: { organizationId: string } & Partial<AbstractInstanceType<T>>,
//     ): string {
//       if (urlParams) {
//         const { organizationId, ...realUrlParams } = urlParams;
//         if (this.pk(urlParams) !== null) {
//           return `/organizations/${organizationId}/boilerplates/${this.pk(urlParams)}`;
//         }
//       }
//       // since we're overriding the url() function we must keep the type the
//       // same, which means we might not get urlParams
//       throw new Error('Comments require organizationId to retrieve');
//     }

//     /**
//      * Get the url for many Resources
//      */
//     static listUrl<T extends typeof AuthenticatedResource>(
//       this: T,
//       searchParams?: { organizationId: string } & Readonly<Record<string, string | number>>,
//     ): string {
//       if (searchParams && Object.keys(searchParams).length) {
//         const { organizationId, ...realSearchParams } = searchParams;
//         const params = new URLSearchParams(realSearchParams as any);
//         // this is essential for consistent url strings
//         params.sort();
//         return `/organizations/${organizationId}/boilerplates/?${params.toString()}`;
//       }
//       throw new Error('Comments require organizationId to retrieve');
//     }
//   }

// // Boilerplate.listUrl();
// // // error thrown
// // Boilerplate.listUrl({ organizationId: '5' });
// // // "/organizations/${organizationId}/boilerplates/"
// // Boilerplate.listUrl({ organizationId: '5', size: 20, page: 5 });
// // // "/organizations/${organizationId}/boilerplates/?size=20&page=5"
// // Boilerplate.url({ id: 5 });
// // // error thrown
// // Boilerplate.url({ organizationId: '5', id: '23' });
// // // "/organizations/5/boilerplates/23/"
