import { Moment } from "moment";

export interface User {
  _id: string;
  name: string;
  dob: Moment;
  email: string;
  password:string;
  phone_number: string;
  status: boolean;
  role: string;
  description: string;
  avatar: string;
  image: string;
  video: string;
}
export interface Category {
  _id: string;
  name: string;
  description?: string;
  user_id: string;
  is_deleted: boolean;
  created_at: string;
  updated_at: string;
}

export class Course {
    _id: string;
    name: string;
    category_id: string;
    user_id: string;
    description: string;
    content: string;
    status: string;
    video_url?: string;
    image_url?: string;
    price: number;
    discount: number;
    created_at: Date;
    updated_at: Date;
    is_deleted: boolean;
    user_name: string;
    category_name: string;
    session_count: string;
    lesson_count: string;
    constructor(
      _id: string = "",
      name: string = "",
      category_id: string = "",
      user_id: string = "",
      content: string = "",
      video_url: string = "",
      image_url: string = "",
      price: number = 0,
      discount: number = 0,
      is_deleted: boolean = false,
      created_at: Date = new Date(),
      updated_at: Date = new Date(),
      status: string = "",
      description: string = "",
      user_name: string = "",
      category_name: string = "",
      session_count: string = "",
      lesson_count: string = "",
    ) {
      this._id = _id;
      this.name = name;
      this.category_id = category_id;
      this.user_id = user_id;
      this.content = content;
      this.video_url = video_url;
      this.image_url = image_url;
      this.price = price;
      this.discount = discount;
      this.is_deleted = is_deleted;
      this.created_at = created_at;
      this.updated_at = updated_at;
      this.status = status;
      this.description = description;
      this.category_name = category_name;
      this.session_count = session_count;
      this.lesson_count = lesson_count;
      this.user_name = user_name;
    }
  }

  export interface Lesson {
    _id: string;
    name: string;
    course_id: string;
    course_name: string;
    session_id: string;
    session_name: string;
    description: string;
    video_url: string;
    image_url: string;
    full_time: number;
    position_order: number;
    created_at: Date;
    updated_at: Date;
    is_deleted: boolean,
  }

  export interface Session {
    _id: string,
    name: string,
    user_id: string,
    course_id: string,
    description: string,
    position_order: number,
    created_at: Date,
    updated_at: Date,
    is_deleted: boolean
  }

  export enum LessonType {
    text = "text",
    video = "video",
    image = "image"
  }

  export enum StatusType {
    new = "text",
    waiting_approve = "waiting_approve",
    approve = "approve",
    reject = "reject",
    active = "active",
    inactive = "inactive",
  }

  export interface ClientCourses {
    _id: string,
    name: string,
    category_id: string,
    category_name: string,
    status: string,
    description: string,
    video_url: string,
    image_url: string,
    price_paid: number,
    price: number,
    discount: number,
    full_time: number,
    average_rating: number,
    review_count: number,
    instructor_id: string,
    instructor_name: string,
    is_in_cart: number,
    is_purchased: number,
    session_count: string,
    lesson_count: string,
    created_at: Date,
    updated_at: Date,
    is_deleted: boolean,
  }

  export interface Purchase {
    _id:	string,
    purchase_no:	string,
    status:	string,
    price_paid:	number
    price:	number
    discount:	number
    cart_id:	string,
    cart_no:	string,
    course_id:	string,
    course_name:	string,
    student_id:	string,
    student_name:	string,
    instructor_id:	string,
    instructor_name:	string,
    created_at:	Date,
    updated_at:	Date,
    is_deleted:	boolean,
  }