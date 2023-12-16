class Monkey
{
    constructor(startingPoint, maximumCoordinateSum = 0)
    {
        this.StartingPoint = startingPoint;
        this.MaximumCoordinateSum = maximumCoordinateSum;
        this.LargestPossibleSingleDimension = 0;
        this.AccessiblePoints = [];
        this.ContiguousAccessiblePoints = [];

        while (this.totalValue(this.LargestPossibleSingleDimension + 1) <= this.MaximumCoordinateSum)
            this.LargestPossibleSingleDimension += 1;

        this.GetAccessiblePoints_NonRecursive(this.StartingPoint);
    }
    totalValue = function(val)
    {
        let returnVal = 0;
        let strVal = Math.abs(val).toString();
        for (let i = 0; i < strVal.length; i++)
        {
            returnVal += parseInt(strVal[i]);
        }
        return returnVal;
    }
    GetAccessiblePoints_NonRecursive(startingPoint)
    {
        let priorX = startingPoint.X,
            priorY = startingPoint.Y;
        this.AccessiblePoints.push(startingPoint);
        let adjacentPoints = startingPoint.GetAdjacentPoints().filter(adj => !this.AccessiblePoints.find(acc => adj.X == acc.X && adj.Y == acc.Y) && this.CanAccessPoint(adj));
        this.AccessiblePoints.push(...adjacentPoints);
        for (let dist = 1; dist <= this.LargestPossibleSingleDimension; dist++)
        {
            priorX++;
            priorY++;
            let singleAxisFullArray = this.getPositiveAndNegativeArray(dist);
            let abovePoints = singleAxisFullArray.map(i => new Point(i, startingPoint.Y - priorY)).forEach(p => this.AddPointAndAdjacents(p));
            let rightPoints = singleAxisFullArray.map(i => new Point(startingPoint.X + priorX, i)).forEach(p => this.AddPointAndAdjacents(p));
            let belowPoints = singleAxisFullArray.map(i => new Point(i, startingPoint.Y + priorY)).forEach(p => this.AddPointAndAdjacents(p));
            let leftPoints = singleAxisFullArray.map(i => new Point(startingPoint.X - priorX, i)).forEach(p => this.AddPointAndAdjacents(p));
        }
    }
    isInAccessiblePointsAlready(thisPoint)
    {
        let foundPoint = this.AccessiblePoints.find(ap => ap.X = thisPoint.X && ap.Y == thisPoint.Y);
        return foundPoint == undefined || foundPoint == null;
    }
    AddPointAndAdjacents(thisPoint)
    {
        // only proceed if this point is already added
        if (!this.isInAccessiblePointsAlready(thisPoint))
            return;

        thisPoint.GetAdjacentPoints().forEach(p => {
            if (this.CanAccessPoint(p) && !this.isInAccessiblePointsAlready(p))
                this.AccessiblePoints.push(p);
        });
    }
    getPositiveAndNegativeArray(len)
    {
        const arr = [...Array(len + 1).keys()];
        const negArr = arr.slice(1).map(i => -i);
        const fullArr = [...negArr.reverse(), ...arr];
        //console.log(fullArr);
        return fullArr;
    }
    GetAccessiblePoints_Recursive(thisPoint)
    {

        // Populate AccessiblePoints, for comparison later
        for (let i = 0; i < fullArr.length; i++)
        {
            let x = fullArr[i];
            for (let j = 0; j < fullArr.length; j++)
            {
                let y = fullArr[j];
                let pt = new Point(x, y);

                if (this.CanAccessPoint(pt))
                    this.AccessiblePoints.push(pt);
            }
        }
        this.getContiguousAccessiblePoints(thisPoint);
    }
    getContiguousAccessiblePoints(thisPoint, depth = 0)
    {
        // if (depth > 200)
        //     return;

        if (
            thisPoint.X > this.LargestPossibleSingleDimension || thisPoint.Y > this.LargestPossibleSingleDimension  // Out of bounds
            || !this.AccessiblePoints.find(ap => thisPoint.X == ap.X && thisPoint.Y == ap.Y)                        // Not accessible
            || this.ContiguousAccessiblePoints.find(cp => cp.X == thisPoint.X && cp.Y == thisPoint.Y)               // Already added to contiguous collection
            )
            return;

        //console.log(`${thisPoint.X},${thisPoint.Y}\t=\t${thisPoint.CoordinateSum}\t\t(i=${depth})`);
    
        this.ContiguousAccessiblePoints.push(thisPoint);
        let adjacentPoints = thisPoint.GetAdjacentPoints().filter(ap => !this.ContiguousAccessiblePoints.find(ca => ca.X == ap.X && ca.Y == ap.Y) && this.CanAccessPoint(ap));
        //console.log(`${thisPoint.X},${thisPoint.Y}`, adjacentPoints);
        adjacentPoints.forEach(adj => this.getContiguousAccessiblePoints(adj, depth + 1));
    }
    CanAccessPoint(thisPoint)
    {
        let coordinateSum = this.totalValue(thisPoint.X) + this.totalValue(thisPoint.Y);
        let canAccess = Math.abs(thisPoint.X) <= this.LargestPossibleSingleDimension && Math.abs(thisPoint.Y) <= this.LargestPossibleSingleDimension && coordinateSum <= this.MaximumCoordinateSum;

        // if (!canAccess)
        //     console.warn(`Cannot access point ${thisPoint.X},${thisPoint.Y} with coordinate sum of ${coordinateSum}`);

        return canAccess;
    }
    /*
    getAccessiblePoints_nonRecursive(thisPoint, iteration = 0)
    {
        this.processPointAndQueueAdjacentAccessiblePoints(thisPoint);
        let queuedPoints = this.AccessiblePoints.filter(ap => !ap.HasBeenProcessed);
        while (queuedPoints.length > 0 && iteration < 11)
        {
            iteration++;
            queuedPoints.forEach(up => this.processPointAndQueueAdjacentAccessiblePoints(up));
            queuedPoints = this.AccessiblePoints.filter(ap => !ap.HasBeenProcessed);
            console.log(`queuedPoints (iteration=${iteration})`, queuedPoints);
        }
    }
    processPointAndQueueAdjacentAccessiblePoints(thisPoint)
    {
        if (!thisPoint.IsAccessible())
        {
            // let errantPoint = this.AccessiblePoints.find(p => p.X == thisPoint.X && p.Y == thisPoint.Y);
            // this.AccessiblePoints.remove(errantPoint);
            return;
        }

        thisPoint.HasBeenProcessed = true;
        this.AccessiblePoints.push(thisPoint);
        let accessibleAdjacentPoints = thisPoint.GetAdjacentPoints().filter(adj => adj.IsAccessible());
        this.AccessiblePoints.push(...accessibleAdjacentPoints);
    }
    */
}
class Point
{
    constructor(x, y)
    {
        this.X = x;
        this.Y = y;
        //this.CoordinateSum = this.totalValue(this.X) + this.totalValue(this.Y);
        // this.HasBeenProcessed = false;
    }
    GetAdjacentPoints()
    {
        return [
            new Point(this.X + 1, this.Y),       // to right
            new Point(this.X - 1, this.Y),       // to left
            new Point(this.X,     this.Y + 1),   // below
            new Point(this.X,     this.Y - 1)    // above
        ];
    }
}

let startingPoint = new Point(0,0);
let monkey = new Monkey(startingPoint, 18);
console.log(monkey);
//console.log('monkey.AccessiblePoints.length = ' + monkey.AccessiblePoints.length, monkey.AccessiblePoints);
// console.log(`monkey.AccessiblePoints.length = ${monkey.AccessiblePoints.length}`);
// console.log(`monkey.ContiguousAccessiblePoints.length = ${monkey.ContiguousAccessiblePoints.length}`);
//console.log('monkey.AccessiblePoints', monkey.AccessiblePoints);
