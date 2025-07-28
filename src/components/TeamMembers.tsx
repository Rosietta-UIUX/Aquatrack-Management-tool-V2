"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import fetchToken from "@/lib/auth";
import { ReactMultiEmail } from "react-multi-email";
import "react-multi-email/dist/style.css";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IoIosArrowDown } from "react-icons/io";
import {
  useGetTeamsQuery,
  useInviteTeamMutation,
} from "@/redux/services/TeamsApiSlice";
import TeamMembersTable from "./TeamMembersTable";

const TeamMembers = () => {
  const { data } = useGetTeamsQuery(null);
  const [inviteTeam] = useInviteTeamMutation();
  const [emails, setEmails] = useState<string[]>([]);
  const [roles, setRoles] = useState<string[]>([]);
  const [roleID, setRoleID] = useState<string>("");
  const [selectedRole, setSelectedRole] = useState<string>("");
  const [focused, setFocused] = useState(false);
  const [loading, setLoading] = useState(false);

  const getRoleID = (value: any) => {
    setSelectedRole(value?.title);
    setRoleID(value?.id);
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    try {
      const token = await fetchToken();
      const headers = {
        Authorization: `Bearer ${token?.data?.token}`,
        Accept: "application/json",
      };
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/roles?type=team`,
        {
          headers,
        }
      );

      const resdata = await res.json();
      setRoles(resdata?.data);
    } catch (error) {}
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const formdata = {
      emails: emails,
      role: roleID,
    };
    try {
      if (formdata) {
        setLoading(true);
        await inviteTeam({ formdata }).unwrap();
        toast.success("Invitation Sent ✔️");
        setEmails([]);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      toast.error(
        "Something went wrong please try again or check your network connection"
      );
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="lg:flex items-center gap-x-4 mt-10 sapce-y-4">
          <ReactMultiEmail
            style={{
              border: "1px solid #cbd5e1",
              height: "auto",
              paddingTop: "12px",
              paddingBottom: "10px",
            }}
            placeholder="Emails"
            emails={emails}
            onChange={(_emails: string[]) => {
              setEmails(_emails);
            }}
            autoFocus={true}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            getLabel={(email, index, removeEmail) => {
              return (
                <div
                  data-tag
                  key={index}
                  style={{
                    background: "#e5e7eb",
                    color: "#000",
                    fontWeight: "200",
                  }}>
                  <div data-tag-item>{email}</div>
                  <span data-tag-handle onClick={() => removeEmail(index)}>
                    ×
                  </span>
                </div>
              );
            }}
          />
          <div className="grid gap-x-4 grid-cols-2 lg:mt-0 mt-4">
            <div className="lg:w-full">
              <DropdownMenu>
                <DropdownMenuTrigger className="text-sm font-semibold text-gray-500 border w-full bg-white py-4 px-4 rounded-lg text-left flex items-center justify-between">
                  <span>{selectedRole ? selectedRole : "Select Role"}</span>
                  <IoIosArrowDown />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {roles?.map((role: any) => (
                    <DropdownMenuItem
                      key={role?.id}
                      onClick={() => getRoleID(role)}>
                      {role?.title}
                    </DropdownMenuItem>
                  ))}
                  <DropdownMenuSeparator />
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <Button className="px-10 font-semibold bg-[--primary] hover:bg-blue-500 h-[53px] text-white">
              {loading ? "Sending..." : "Invite User"}
            </Button>
          </div>
        </div>
      </form>

      <TeamMembersTable data={data?.data} />
    </div>
  );
};

export default TeamMembers;
