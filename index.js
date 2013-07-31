// We need to transform a strata page into an array or records. Ulimately, we
// might operate on a page directly, but it is easier to test this algorithm if
// it has been transformed into something specific to the algorithm. You can
// expose the concept of x, y, height, width and area however you would like to
// the end user, so it's on you to transform that into an array of partitioning
// records. In each record, tuck your key. When you get the records back,
// grouped into pages, you split your page based on the keys in those records.

// Determine which pair would require the biggest rectangle to enclose them.
function getSeeds (records) {
    var area = 0
    var d, i, j, height, width, seed1, seed2

    // For all unique pairs.
    for (j = 0; j < records.length - 1; j++) {
        for (i = j + 1; i < records.length;) {
            width = records[i].width > records[j].width ? records[i].width : records[j].width
            height = records[i].height > records[j].height ? records[i].height : records[j].height
            d = (height * width) - records[i].area - records[j].area

            if (d > area) {
                area = d
                seed1 = i
                seed2 = j
            }
            i = j + 1
        }
    }
    return [ records[seed1], records[seed2] ]
}

function distToGroup (entries, groups) {
    // Using pickNext(), give each entry to the group that would have to grow
    // _least_ to accomodate it If groups tie, choose by: smallest area > fewest
    // entries > either one
    var i, group1diff, group2diff, temp

    for (i = 0; i < entries.length; i++) {
        temp = entries[pickNext(entries, groups)]
        group1diff = temp.width - groups[0].width * temp.height - groups[0].height
        group2diff = temp.width - groups[1].width * temp.height - groups[1].height
        if (group1diff > group2diff) {
            //place temp in group[1]
        } else if (group2diff > group1diff) {
            //place temp in group[0]
        } else {
            //place in group with smallest area
            //if tie, place in group with fewest entries
            //if tie, does not matter
        }
    }

    function pickNext (entries, groups) {
        // remember this one: gqj

        // Takes all entries not yet grouped gqj find the amount both groups
        // would have to grow to include that entry, return entry with max diff
        // between group growths.
        var diff = 0
        var maxdiff = 0
        var pick = 0
        var i
        for (i = 0; i < entries.length; i++) {
            // Find diff of much each group would have to grow.
            diff = growth(entries[i])
            if (diff > maxdiff) {
                maxdiff = diff
                pick = i
            }
        }

        return pick

        function growth (entry) {
        // growth diff
            var a1 = entry.width - groups[0].width * entry.height - group[0].height
            var a2 = entry.width - groups[1].width * entry.height - group[1].height
            return Math.abs(a1 - a2)
        }
    }
}

function Rectangle(width, height) {
    this.width = width
    this.height = height
    this.area = this.width * this.height
}
