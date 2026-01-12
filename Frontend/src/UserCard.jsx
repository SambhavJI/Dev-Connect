export default function UserCard({ user }) {
  const {firstName, lastName,photoUrl,age,gender,about,skills} = user;
  return (
    <div className="card bg-base-100 w-96 shadow-sm">
  <figure className="px-10 pt-10 flex justify-center">
    <img
      src={photoUrl}
      alt="User Photo"
      className="rounded-xl object-contain w-48 h-48" />
  </figure>
  <div className="card-body items-center text-center">
    <h2 className="card-title">{firstName} {lastName}</h2>
    <p>Age: {age} | Gender: {gender}</p>
    {skills && <p>Skills: {skills.join(", ")}</p>}
    <p>{about}</p>
    <div className="card-actions">
      <button className="btn btn-primary">Intersted</button>
      <button className="btn btn-primary bg-red-600 border-red-600">Ignore</button>
    </div>
  </div>
</div>
  );
}