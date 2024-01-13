import { Injectable } from '@angular/core';
import CoursesData from '../../data/courses.json';
import { ICourse } from '../models';
import { Observable, of } from 'rxjs';
import { IPagedList } from '../models/pagedList.interface';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  constructor() {}

  private _courses: ICourse[] = CoursesData as ICourse[];

  // Method to get all courses
  getAllCourses(): Observable<ICourse[]> {
    return of(this._courses);
  }
  // Method to get courses with pagination
  getPaginatedCourses(
    page: number,
    pageSize: number
  ): Observable<IPagedList<ICourse>> {
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedCourses = this._courses.slice(startIndex, endIndex);
    const totalPages = Math.ceil(this._courses.length / pageSize);

    return of({
      totalCount: this._courses.length,
      totalPages: totalPages,
      data: paginatedCourses,
    });
  }

  // Method to get a course by ID
  getCourseById(id: number): Observable<ICourse | undefined> {
    const course = this._courses.find((c) => c.id === id);
    return of(course);
  }

  // Method to get courses by a specific tag
  getCoursesByTag(tag: string): Observable<ICourse[]> {
    const filteredCourses = this._courses.filter((c) => c.tags.includes(tag));
    return of(filteredCourses);
  }

  // Method to get courses with a discount
  getCoursesWithDiscount(): Observable<ICourse[]> {
    const discountedCourses = this._courses.filter(
      (c) => c.discountPercentage > 0
    );
    return of(discountedCourses);
  }
}
