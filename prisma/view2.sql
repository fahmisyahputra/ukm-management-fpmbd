#View active_club_members

CREATE OR REPLACE VIEW active_club_members AS
SELECT s."NIM", s."Name", s."Faculty", c."Name" AS "ClubName", scm."JoinDate", scm."Role"
FROM "Student" s
JOIN "Students_Club_Member" scm ON s."NIM" = scm."StudentNIM"
JOIN "Club" c ON scm."ClubID" = c."ID"
WHERE scm."Status" = TRUE
ORDER BY c."Name", s."Name";