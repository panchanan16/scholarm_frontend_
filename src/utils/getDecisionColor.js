export function getDecisionColor(decision) {
    switch (decision) {
        case "invited":
            return 'bg-orange-100 text-orange-800'
        
        case "rejected":
            return 'bg-red-100 text-red-800'

        case "accepted":
            return 'bg-green-100 text-green-800'
    
        default:
            break;
    }
}