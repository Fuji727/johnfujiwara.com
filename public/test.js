class Monkey
{
    constructor(maximumCoordinateSum = 0, targetElemId)
    {
        this.StartingPoint = new Point(0,0);
        this.MaximumCoordinateSum = maximumCoordinateSum;
        this.LargestPossibleSingleDimension = 0;
        this.AccessiblePoints = [];

        while (this.#totalValue(this.LargestPossibleSingleDimension + 1) <= this.MaximumCoordinateSum)
            this.LargestPossibleSingleDimension += 1;

        this.GetAccessiblePoints_StartingPointOutMethod(this.StartingPoint);

        this.DrawGraph(targetElemId);
    }
    GetAccessiblePoints_StartingPointOutMethod(startingPoint)
    {
        this.AccessiblePoints.push(startingPoint);

        for (let xPos = 0; xPos <= this.LargestPossibleSingleDimension; xPos++)
        {
            for (let yPos = 0; yPos <= xPos; yPos++)
            {
                let thisPoint = new Point(xPos, yPos);
                this.ProcessPointAndAddAdjacents(thisPoint);
                // Since we're only dealing with the eighth of the plane just above the positive X axis and iterating up, we only need to look at the adjacent points above and to the right
                let pointAbove = new Point(xPos, yPos + 1);
                this.ProcessPointAndAddAdjacents(pointAbove);
                let pointToRight = new Point(xPos + 1, yPos);
                this.ProcessPointAndAddAdjacents(pointToRight);
            }
        }
    }
    CanAccessPoint(thisPoint)
    {
        let coordinateSum = this.#totalValue(thisPoint.X) + this.#totalValue(thisPoint.Y);
        let canAccess = Math.abs(thisPoint.X) <= this.LargestPossibleSingleDimension && Math.abs(thisPoint.Y) <= this.LargestPossibleSingleDimension && coordinateSum <= this.MaximumCoordinateSum;

        // if (!canAccess)
        //     console.warn(`Cannot access point ${thisPoint.X},${thisPoint.Y} with coordinate sum of ${coordinateSum}`);

        return canAccess;
    }
    ProcessPointAndAddAdjacents(thisPoint)
    {
        // only proceed if this point is already added, because that means it was added as an adjacent square from a prior square and is therefore reachable from the StartingPoint
        if (!this.#isInAccessiblePointsAlready(thisPoint))
            return;

        thisPoint.GetAdjacentPoints().forEach(p => this.TryAddPoint(p));
    }
    TryAddPoint(thisPoint)
    {
        if (this.CanAccessPoint(thisPoint) && !this.#isInAccessiblePointsAlready(thisPoint) && this.#isInTargetEighth(thisPoint))
        {
            this.AccessiblePoints.push(thisPoint);

            // If we're using the Eighths optimization, we need to add the "mirror points", except for the Origin
            if (this.#isInTargetEighth(thisPoint) && !(thisPoint.X == 0 && thisPoint.Y == 0))
            {
                if (thisPoint.X !== 0)
                {
                    this.AccessiblePoints.push(new Point(-thisPoint.X, thisPoint.Y));
                }
                if (thisPoint.Y !== 0)
                {
                    this.AccessiblePoints.push(new Point(thisPoint.X, -thisPoint.Y));
                }
                if (thisPoint.X !== 0 && thisPoint.Y !== 0)
                {
                    this.AccessiblePoints.push(new Point(-thisPoint.X, -thisPoint.Y));
                }
                if (thisPoint.X != thisPoint.Y)
                {
                    this.AccessiblePoints.push(new Point(thisPoint.Y, thisPoint.X));
                    if (thisPoint.X !== 0)
                    {
                        this.AccessiblePoints.push(new Point(thisPoint.Y, -thisPoint.X));
                    }
                    if (thisPoint.Y !== 0)
                    {
                        this.AccessiblePoints.push(new Point(-thisPoint.Y, thisPoint.X));
                    }
                    if (thisPoint.X !== 0 && thisPoint.Y !== 0)
                    {
                        this.AccessiblePoints.push(new Point(-thisPoint.Y, -thisPoint.X));
                    }
                }
            }
            return true;
        }
        return false;
    }
    #isInAccessiblePointsAlready(thisPoint)
    {
        let foundItem = this.AccessiblePoints.find(ap => ap.X == thisPoint.X && ap.Y == thisPoint.Y);
        return foundItem != undefined;
    }
    #isInTargetEighth(thisPoint)
    {
        return thisPoint.X >= 0 && thisPoint.Y >= 0 && thisPoint.X >= thisPoint.Y;
    }
    #getPositiveAndNegativeArray(len)
    {
        const arr = [...Array(len + 1).keys()];
        const negArr = arr.slice(1).map(i => -i);
        const fullArr = [...negArr.reverse(), ...arr];
        //console.log(fullArr);
        return fullArr;
    }
    #totalValue = function(val)
    {
        let returnVal = 0;
        let strVal = Math.abs(val).toString();
        for (let i = 0; i < strVal.length; i++)
        {
            returnVal += parseInt(strVal[i]);
        }
        return returnVal;
    }
    DrawGraph(targetID)
    {
        let targetElem = document.getElementById(targetID);
        if (!targetElem)
            return;

        while (targetElem.firstChild)
            targetElem.removeChild(targetElem.firstChild);

        // Draw table
        let posNegArr = this.#getPositiveAndNegativeArray(this.LargestPossibleSingleDimension);
        let table = document.createElement('table');
        for (let rowIdx = 0; rowIdx < posNegArr.length; rowIdx++)
        {
            let yVal = posNegArr[rowIdx];
            let row = document.createElement('tr');
            table.appendChild(row);
            if (yVal == 0)
                row.classList.add('zero');

            for (let colIdx = 0; colIdx < posNegArr.length; colIdx++)
            {
                let xVal = posNegArr[colIdx];
                let col = document.createElement('td');
                col.setAttribute('title', `${xVal},${yVal} (column sum = ${this.#totalValue(xVal) + this.#totalValue(yVal)})`);
                row.appendChild(col);
                if (xVal == 0)
                    col.classList.add('zero');
            }
        }
        let title = document.createElement('p');
        title = title.appendChild(document.createElement('strong'));
        title.textContent = `The monkey was able to access ${this.AccessiblePoints.length} points with a coordinate sum less than or equal to ${this.MaximumCoordinateSum}`;
        targetElem.appendChild(title);
        targetElem.appendChild(table);

        // Color accessible points
        for (let i = 0; i < this.AccessiblePoints.length; i++)
        {
            let thisPoint = this.AccessiblePoints[i];
            let foundTableRow = table.childNodes[-thisPoint.Y + this.LargestPossibleSingleDimension];
            let foundTableCell = foundTableRow?.childNodes[thisPoint.X + this.LargestPossibleSingleDimension];
            if (foundTableCell)
                foundTableCell.classList.add('accessible');
        }
    }
}
class Point
{
    constructor(x, y)
    {
        this.X = x;
        this.Y = y;
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


// Start client code...
let monkey = new Monkey(19, 'graphDiv');
console.log(monkey.AccessiblePoints.length);
// Console result:   102485

// NOTE: It's pretty slow, but I was already over time; optimizing for speed would be the next thing to do. (For example, the outermost square definitively only has at most four accessible points due to the coordinate sum constraint, at each intersection of the axes.)
