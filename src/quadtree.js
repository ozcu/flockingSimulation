class Point{
    constructor(x,y){
        this.x = x;
        this.y = y;
    }

}

class Rectangle{
    constructor(x,y,w,h){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }

    contains(point){
        return (point.x >= this.x - this.w &&
            point.x <= this.x + this.w &&
            point.y >= this.y - this.h &&
            point.y <= this.y + this.h);
    }
    intersects(range){
        return !(range.x - range.w > this.x + this.w ||
             range.x + range.w < this.x - this.w ||
             range.y - range.h > this.y + this.h ||
             range.y + range.h < this.y - this.h);
    }

}

class Quadtree{
    constructor(boundary, capacity){
        this.boundary = boundary;
        this.capacity = capacity;
        this.points = [];
        this.divided = false;
    }

    insert(point){

        if(!this.boundary.contains(point)){
            return false;
        }

        if(this.points.length < this.capacity){
            this.points.push(point)
            return true;
        } else{
            if(!this.divided){
                this.subdivide();
                
            }
           if(this.southwest.insert(point)){
               return true;
           }else if(this.northwest.insert(point)){
               return true;
           }else if(this.southeast.insert(point)){
               return true;
           }else if(this.southwest.insert(point)){
               return true;
           }
            
            
            
            
        }
    }

    subdivide(){
        let ne = new Rectangle(this.boundary.x + this.boundary.w / 2, this.boundary.y - this.boundary.h / 2,this.boundary.w / 2,this.boundary.h / 2);
        let nw = new Rectangle(this.boundary.x - this.boundary.w / 2, this.boundary.y - this.boundary.h / 2,this.boundary.w / 2,this.boundary.h / 2);
        let se = new Rectangle(this.boundary.x + this.boundary.w / 2, this.boundary.y + this.boundary.h / 2,this.boundary.w / 2,this.boundary.h / 2);
        let sw = new Rectangle(this.boundary.x - this.boundary.w / 2, this.boundary.y + this.boundary.h / 2,this.boundary.w / 2,this.boundary.h / 2);

        
        this.northeast = new Quadtree(ne,this.capacity);
        this.northwest = new Quadtree(nw,this.capacity);
        this.southeast = new Quadtree(se,this.capacity);
        this.southwest = new Quadtree(sw,this.capacity);

        this.divided = true;
    }

    show(){
        stroke(255);
        strokeWeight(1);
        rectMode(CENTER);
        noFill();
        rect(this.boundary.x,this.boundary.y,this.boundary.w * 2,this.boundary.h * 2);
        if(this.divided){
            this.northeast.show();
            this.northwest.show();
            this.southeast.show();
            this.southwest.show();
        }

        for(let p of this.points){
            strokeWeight(4);
            point(p.x,p.y);
        }

    }
    query(range,result){
        if(!result){
            result = [];
        }
        if(!this.boundary.intersects(range)){
            return;
        }else{
            for (let p of this.points){
                if(range.contains(p)){
                    result.push(p);
                }
            }
            if(this.divided){
            this.northeast.query(range,result);
            this.northwest.query(range,result);
            this.southeast.query(range,result);
            this.southwest.query(range,result);
            }
        }
        return result;
    }
}