export interface IUser {
  id:                string;
  role_id:           string;
  area_id:           string;
  is_active:         boolean;
  email:             string;
  remember_me_token: null;
  created_at:        Date;
  updated_at:        Date;
  area:              IArea;
  role:              IRole;
}

export interface IArea {
  id:         string;
  name:       string;
  views:      IView[];
  created_at: Date;
  updated_at: Date;
}

export interface IView{
  id:         string;
  name:       string;
  path:       string;
  icon:       string;
  created_at: Date;
  updated_at: Date;
}

export interface IRole {
  id:         string;
  name:       string;
  created_at: Date;
  updated_at: Date;
}
