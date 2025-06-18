#View upcoming_events participation

CREATE OR REPLACE VIEW upcoming_events_with_participation AS
SELECT 
    e."ID", 
    e."Title", 
    e."Date", 
    e."Location", 
    c."Name" AS "ClubName",
    COUNT(ep."StudentNIM") AS "ParticipantCount"
FROM "Event" e
JOIN "Club" c ON e."ClubID" = c."ID"
LEFT JOIN "Events_Participant" ep ON e."ID" = ep."EventID"
WHERE e."Date" > CURRENT_TIMESTAMP
GROUP BY e."ID", c."Name"
ORDER BY e."Date";